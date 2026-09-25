export function validateArgentineDNI(dni: string) {
    const regex = /^\d{7,8}$/;
    return regex.test(dni);
}
