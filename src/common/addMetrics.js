   
export const standardizeMetrics = (num) => {
    if (num > 1000000) {
        let suffix = "M+"
        let k1 = ((num*1.0)/ 1000000).toFixed(1)
        return (k1 + suffix)
    } 
    else if (num > 1000) {
        let suffix = "K+"
        let numeric_prefix = ((num*1.0)/ 1000).toFixed(1)
        return(numeric_prefix + suffix)
    } 
    else {
        return (num+"")
    }
}

