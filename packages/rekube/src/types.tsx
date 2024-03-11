import React from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            resource: {
                kind: string;
                apiVersion: string;
                metadata?: Record<string, any>;
                children?: React.ReactNode;
            };

            prop: {
                path: string;
                value?: any;
                children?: React.ReactNode;
            };

            item: {
                path: string;
                value?: any;
                children?: React.ReactNode;
            };

            root: {};

            warp: {
                transformer: (value: object) => object;
                children: React.ReactNode;
            };
        }
    }
}

export type Suffix =
    | "Ki"
    | "Mi"
    | "Gi"
    | "Ti"
    | "Pi"
    | "Ei"
    | "m"
    | ""
    | "k"
    | "M"
    | "G"
    | "T"
    | "P"
    | "E";
export type Quantity =
    | number
    | `${number}${Suffix}`
    | `e${number}`
    | `E${number}`;

export type IntOrString = number | string;

export type ParamKind = {
    apiVersion: string;
    kind: string;
};

export type Time = string | Date;
export type MicroTime = string | Date;

export type JSONValue = string | number | boolean | JSONObject | JSONArray;

export type RawExtension = object;

export interface JSONObject {
    [x: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}
