# RE:KUBE PROJECT

React renderer for Kubernetes configurations.  
JSX instead of clumsy YAML, declarative and type-safe configurations.

## Why Rekube?

1. **Leverage programming:**  
   Use variables, functions, type-safety, conditional rendering, etc.

2. **Leverage React:**  
   Context aware configurations, Reusable components, Package ecosystem

## Before you start

Install [node](https://nodejs.org/en/download) if you don't have it already.

As option, install one of the following package managers:
- [yarn](https://yarnpkg.com/getting-started/install)
- [pnpm](https://pnpm.io/installation)

## Getting started

1. Init the project

   ```bash
   mkdir /your/project
   cd /your/project
   npm init # You could use pnpm or yarn if you prefer
   ```

2. Add Rekube base components package to the project:
   
   ```bash
   npm install -D rekube @rekube/base
   ```
   
   or
   ```bash
   pnpm install -D rekube @rekube/base
   yarn add -D rekube @rekube/base
   ```

3. Create a file `k8s.tsx` with the following content:

   ```tsx
   import { Deployment } from "@rekube/base/apps/v1";
   import { Container, ContainerPort, PodTemplateSpec, Service, ServicePort } from "@rekube/base/core/v1";
   
   export default function App() {
       const labels = { app: "nginx" };
   
       return (
           <>
               <Deployment
                   meta:name="nginx"
                   replicas={3}
                   selector={{ matchLabels: labels }}
               >
                   <PodTemplateSpec meta:labels={labels}>
                       <Container name="nginx" image="nginx:1.14.2">
                           <ContainerPort containerPort={80} />
                       </Container>
                   </PodTemplateSpec>
               </Deployment>
   
               <Service meta:name="nginx-svc" selector={{ labels }}>
                   <ServicePort port={80} targetPort={80} protocol="TCP" />
               </Service>
           </>
       );
   }
   ```

4. Run `rekube` cli in the project directory.

   It will render the k8s.tsx file to stdout:
   ```bash
   npx rekube
   npx rekube ./other/file.tsx
   npx rekube > k8s.yaml
   ```
   
   or pipe it directly to kubectl:
   ```bash
   npx rekube | kubectl apply -f -
   ```

## Publishing your Rekube packages on npm

Rekube utilizes the npm ecosystem.  
You can publish your Rekube components just like [any other npm package](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages).  
Moreover, Rebuke includes a built-in transpiler that enables you to directly publish `tsx/jsx` files.

## Generating Rekube Components out of yaml file

Rekube includes a built-in transpiler that enables you to directly convert `yaml` files to `tsx` files.

```bash
npx rekube convert ./path/to/your/file.yaml
```

## Contributing

Any contribution is welcome. Either it's a bug report, a feature request, or a pull request.
Reach me out if you have any questions or need help with anything.
