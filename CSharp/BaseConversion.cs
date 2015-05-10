/* http://www.codewars.com/kata/526a569ca578d7e6e300034e
    In this kata you have to implement a base converter, which converts between arbitrary bases / alphabets. Here are some pre-defined alphabets:

    newtype Alphabet = Alphabet { getDigits :: [Char] } deriving (Show)
    bin, oct, dec, hex, alphaLower, alphaUpper, alpha, alphaNumeric :: Alphabet
    bin = "01"
    oct = ['0'..'7']
    dec = ['0'..'9']
    hex = ['0'..'9'] ++ ['a'..'f']
    alphaLower    = ['a'..'z']
    alphaUpper    = ['A'..'Z']
    alpha         = ['a'..'z'] ++ ['A'..'Z']
    alphaNumeric  = ['0'..'9'] ++ ['a'..'z'] ++ ['A'..'Z']
    The function convert() should take an input (string), the source alphabet (string) and the target alphabet (string). You can assume that the input value always consists of characters from the source alphabet. You don't need to validate it.

    Examples:

    convert dec bin "15"   `shouldBe` "1111"
    convert dec oct "15"   `shouldBe` "17"
    convert bin dec "1010" `shouldBe` "10"
    convert bin hex "1010" `shouldBe` "a"

    convert dec alpha      "0"     `shouldBe` "a"
    convert dec alphaLower "27"    `shouldBe` "bb"
    convert alphaLower hex "hello" `shouldBe` "320048"
    Additional Notes:

    The maximum input value can always be encoded in a number without loss of precision in JavaScript. In Haskell, intermediate results will probably be to large for Int.
    The function must work for any arbitrary alphabets, not only the pre-defined ones
    You don't have to consider negative numbers
*/

namespace CSharp.Codewars
{
    using System.Linq;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Numerics;

    public class BaseConversionCs
    {
        public static char[] bin = "01".ToCharArray();
        public static char[] oct = "01234567".ToCharArray();
        public static char[] dec = "0123456789".ToCharArray();
        public static char[] hex = "0123456789abcdef".ToCharArray();
        public static char[] alphaLower = "abcdefghijklmnopqrstuvwxyz".ToCharArray();
        public static char[] alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
        public static char[] alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
        public static char[] alphaNumeric = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();

        public static BigInteger toDecimal(char[] from, string str)
        {
            string fromStr = new string(from);

            return str.ToCharArray()
               .Select(chr => fromStr.IndexOf(chr))
               .Select(i => (long)i)
               .Select((x, i) => System.Numerics.BigInteger.Pow(from.Length, -1 + str.Length - i) * x)
               .Aggregate((a, b) => a + b);
        }

        public static IEnumerable<int> ToBase(int len, BigInteger value)
        {
            if (value == 0) { return new List<int>(); }
         
            BigInteger remainder = 0;
            BigInteger quotient= BigInteger.DivRem(value, len, out remainder);
            return new List<int> { (int)remainder }.Concat(ToBase(len,quotient));
        }

        public static string convert(char[] from, char[] to, string str)
        {
            var value = ToBase(to.Length, toDecimal(from, str))
                .Reverse()
                .Select(i => to[i])
                .ToArray();

            return value.Length > 0 ? new string(value) : to[0].ToString();
        }
    }
}