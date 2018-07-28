
export class constantService{
  validationRegexs = {
    dateReg : /^(([0-9])|([0-2][0-9])|([3][0-1]))[./-](([0][1-9])|([1][0-2]))[./-](\d{2}|\d{4})$/,
    otherDateReg : /^(([0-9])|([0-2][0-9])|([3][0-1]))[./-](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[./-](\d{2}|\d{4})$/,
    numberReg : /^-?[0-9]\d*$/,
    doubleReg : /^-?[0-9]\d*(\.\d+)?$/,
  };
}