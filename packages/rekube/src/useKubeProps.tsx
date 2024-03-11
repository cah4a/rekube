/**
 * React hook to process `meta:*` keys from props, wrap props into some key, process flags.
 *
 * @param props
 * @param key
 * @param flags
 */
export function useKubeProps(
    props: Record<string, any>,
    {
        key,
        flags,
        defaultFlag,
    }: {
        key?: string;
        flags?: string[];
        defaultFlag?: string;
    }
) {
    const metadata = Object.assign(
        {},
        Object.fromEntries(
            Object.keys(props)
                .filter((name) => name.startsWith("meta:"))
                .map((key) => {
                    const value = props[key];
                    delete props[key];
                    return [key.substring(5), value];
                })
        ),
        props["metadata"]
    );

    delete props["metadata"];

    const flag = (flags || []).find((flag) => props[flag]) || defaultFlag;

    if (flags?.length) {
        for (const flag of flags) {
            delete props[flag];
        }
    }

    let childProps = key ? { [key]: props } : { ...props };

    if (Object.keys(metadata).length) {
        childProps = { metadata, ...childProps };
    }

    return {
        childProps,
        flag,
    };
}
