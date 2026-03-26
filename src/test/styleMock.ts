const styleProxy = new Proxy(
    {},
    {
        get: (_, property: string) => property,
    }
);

export default styleProxy;
