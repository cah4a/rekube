import React from "react";
import { test, expect } from "vitest";
import { renderYaml } from ".";

test("render", async () => {
  const rds = await renderYaml(
    <resource-definition
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
    </resource-definition>
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
