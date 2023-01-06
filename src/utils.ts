export function groupBy(list: any[], key: string | number) {
    return list.reduce((prev, curr) => {
        return {
            ...prev,
            [curr[key]]: [
                ...(prev[key] || []),
                curr,
            ]
        }
    }, {})
}