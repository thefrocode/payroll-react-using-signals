// export interface Report {
//     "BS":number,
//     "CO":number,
//     "SC":number,
//     "email":string,
//     "first_name":string,
//     "last_name":string,
//     "gross_pay":string,
//     "housing_levy":string,
//     "id":number,
//     "id_number":string,
//     "net_pay":string,
//     "nhif":string,
//     "nhif_relief":string,
//     "nssf":string,
//     "nssf_tier_1":string,
//     "nssf_tier_2":string,
//     "paye":string,
//     "personal_relief":string,
//     "phone":string,
//     "tax_before_relief":string,
//     "taxable_income":string,
//     "total_deductions":string
// }
export interface Report {
    [key:string]: string | number | undefined
}

export const TReport= {
    "first_name":"",
    "last_name":"",
    "BS":0,
    "CO":0,
    "SC":0,
    "email":"",
    "gross_pay":"",
    "housing_levy":"",
    "id_number":"",
    "net_pay":"",
    "nhif":"",
    "nhif_relief":"",
    "nssf":"",
    "nssf_tier_1":"",
    "nssf_tier_2":"",
    "paye":"",
    "personal_relief":"",
    "phone":"",
    "tax_before_relief":"",
    "taxable_income":"",
    "total_deductions":""
}
export const TReportNHIF = {
    "first_name":"",
    "last_name":"",
    "id_number":"",
    "nhif_number":"",
    "nhif":0
}

export const TReportNSSF = {
    "first_name":"",
    "last_name":"",
    "id_number":"",
    "nssf_number":"",
    "gross_pay":"",
    "nssf":0

}

export interface SavedReport {
    [key:string]: string | number
}
