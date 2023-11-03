export interface Employee {
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    id_number?: string;
    nhif_number?: string;
    nssf_number?: string;
    branch: string;
    department: string;
}
export const TEmployee = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    branch: '',
    department: '',
};