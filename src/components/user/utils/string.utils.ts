import * as bcrypt from 'bcrypt';


export const hashString = async (text: string, salt = 10 ): Promise<string> => {
   return  await bcrypt.hash(text, salt);
} 

export const compareStringViaHash = async (hashedStr: string, str: string ): Promise<boolean> => {
    const isSame = await bcrypt.compare(str, hashedStr);
    return isSame;
} 



export const computePhonenumber = (countryCode: string, phoneNumber: string): string => {
    const e164CountryCode = countryCode.replace(/\+/g, '');
    const e164PhoneNumber = phoneNumber.startsWith('0') ? phoneNumber.substr(1) : phoneNumber;

    return e164CountryCode + e164PhoneNumber;
  }

export const computeLastTenDigitsOfPhoneNumber = (phone: string = ''): string => {
    if (phone.length <= 10) return phone;
    return phone.slice(phone.length - 10);
  }
