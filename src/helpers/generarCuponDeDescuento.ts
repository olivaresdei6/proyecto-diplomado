export const generarCuponDeDescuento = (length: number): string => {
    const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let couponCode = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        couponCode += charset[randomIndex];
    }
    return couponCode;
}
