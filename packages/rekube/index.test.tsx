import React, { useEffect, useState } from "react";
import { describe, test, expect, vi } from "vitest";
import { renderYaml, useAssert, useLateState } from ".";
import { Warp } from "./src/warp";

describe("rekube", () => {
    test("renders yaml", async () => {
        const rds = await renderYaml(
            <resource
                apiVersion="apps/v1"
                kind="Deployment"
                metadata={{ name: "nginx", labels: { app: "nginx" } }}
            >
                <prop path="spec">
                    <prop path="matchLabels.app" value="nginx" />

                    <prop path="template.metadata.labels.app" value="nginx" />

                    <item path="template.spec.containers">
                        <prop path="name" value="nginx" />
                        <prop path="image" value="nginx:1.14.2" />
                        <item path="ports" value={{ containerPort: 80 }} />
                    </item>
                </prop>
            </resource>
        );

        expect(rds).toMatchInlineSnapshot(`
            "apiVersion: apps/v1
            kind: Deployment
            metadata:
              name: nginx
              labels:
                app: nginx
            spec:
              matchLabels:
                app: nginx
              template:
                metadata:
                  labels:
                    app: nginx
                spec:
                  containers:
                    - name: nginx
                      image: nginx:1.14.2
                      ports:
                        - containerPort: 80
            "
        `);
    });

    test("useAssert should failed", async () => {
        const Value = () => {
            useAssert(false, new Error("That should be thrown"));
            return <></>;
        };

        await expect(() =>
            renderYaml(
                <resource
                    apiVersion="apps/v1"
                    kind="Deployment"
                    metadata={{ name: "nginx", labels: { app: "nginx" } }}
                >
                    <Value />
                </resource>
            )
        ).rejects.toMatchObject({
            message: expect.any(String),
            asserts: [expect.any(Error)],
        });
    });

    test("useAssert should not failed after condition updates", async () => {
        const Value = () => {
            const [state, setState] = useState(false);
            useAssert(state, new Error("That should not be thrown"));

            if (!state) {
                // that will trigger suspense
                throw new Promise((resolve) => {
                    setTimeout(() => {
                        // after setState is called, the component will re-render with assertion passed
                        setState(true);
                        resolve(true);
                    }, 10);
                });
            }

            return <></>;
        };

        expect(
            await renderYaml(
                <resource
                    apiVersion="apps/v1"
                    kind="Deployment"
                    metadata={{ name: "nginx", labels: { app: "nginx" } }}
                >
                    <Value />
                </resource>
            )
        ).toMatchInlineSnapshot(`
          "apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: nginx
            labels:
              app: nginx
          "
        `);
    });

    test("useLateState should throw error", async () => {
        const Value = () => {
            const [state] = useLateState({ name: "test" });
            return <prop path="test.something" value={state} />;
        };

        await expect(() =>
            renderYaml(
                <resource
                    apiVersion="apps/v1"
                    kind="Deployment"
                    metadata={{ name: "nginx", labels: { app: "nginx" } }}
                >
                    <Value />
                </resource>
            )
        ).rejects.toMatchObject({
            message: expect.any(String),
            asserts: [expect.any(Error)],
        });
    });

    test("useLateState should not throw if value was set", async () => {
        const Value = () => {
            const [state, setState] = useLateState({ name: "test" });

            useEffect(() => {
                setState({ name: "hello" });
            }, []);

            return <prop path="test.something" value={state} />;
        };

        expect(
            await renderYaml(
                <resource
                    apiVersion="apps/v1"
                    kind="Deployment"
                    metadata={{ name: "nginx", labels: { app: "nginx" } }}
                >
                    <Value />
                </resource>
            )
        ).toMatchInlineSnapshot(`
          "apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: nginx
            labels:
              app: nginx
          test:
            something:
              name: hello
          "
        `);
    });

    test("warp resource", async () => {
        const transformer = vi.fn((resource) => ({
            ...resource,
            redacted: true,
        }));

        const rds = await renderYaml(
            <Warp transformer={transformer}>
                <resource
                    apiVersion="apps/v1"
                    kind="Deployment"
                    metadata={{ name: "nginx", labels: { app: "nginx" } }}
                >
                    <prop path="spec.matchLabels.app" value="nginx" />
                </resource>
            </Warp>
        );

        expect(transformer.mock.calls[0]).toMatchObject([
            {
                apiVersion: "apps/v1",
                kind: "Deployment",
                metadata: {
                    labels: {
                        app: "nginx",
                    },
                    name: "nginx",
                },
                spec: {
                    matchLabels: {
                        app: "nginx",
                    },
                },
            },
        ]);

        expect(rds).toMatchInlineSnapshot(`
          "apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: nginx
            labels:
              app: nginx
          spec:
            matchLabels:
              app: nginx
          redacted: true
          "
        `);
    });

    test("warp prop", async () => {
        const transformer = vi.fn((resource) => ({
            ...resource,
            redacted: true,
        }));

        const rds = await renderYaml(
            <resource
                apiVersion="apps/v1"
                kind="Deployment"
                metadata={{ name: "nginx", labels: { app: "nginx" } }}
            >
                <prop path="spec">
                    <prop path="template.metadata.labels.app" value="nginx" />
                    <Warp transformer={transformer}>
                        <prop path="matchLabels.app" value="nginx" />
                    </Warp>
                </prop>
            </resource>
        );

        expect(transformer.mock.calls[0][0]).toMatchObject({
            matchLabels: {
                app: "nginx",
            },
        });

        expect(rds).toMatchInlineSnapshot(`
          "apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: nginx
            labels:
              app: nginx
          spec:
            template:
              metadata:
                labels:
                  app: nginx
            matchLabels:
              app: nginx
            redacted: true
          "
        `);
    });
});
