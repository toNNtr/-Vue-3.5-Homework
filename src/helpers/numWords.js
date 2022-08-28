export default function(iNum, arr_sWordVariants) {
    if(iNum > 10 && iNum < 20) {
        return arr_sWordVariants[2];
    }

    iNum = iNum % 10;
    if(iNum == 1) {
        return arr_sWordVariants[0];
    }
    if(iNum > 1 && iNum < 5) {
        return arr_sWordVariants[1];
    }
    
    return arr_sWordVariants[2];
}