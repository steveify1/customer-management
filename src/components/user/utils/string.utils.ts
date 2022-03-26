import * as bcrypt from 'bcrypt';


export const hashString = async (text: string, salt = 10 ): Promise<string> => {
   return  await bcrypt.hash(text, salt);
} 

export const compareStringViaHash = async (hashedStr: string, str: string ): Promise<boolean> => {
    const isSame = await bcrypt.compare(str, hashedStr);
    return isSame;
}
