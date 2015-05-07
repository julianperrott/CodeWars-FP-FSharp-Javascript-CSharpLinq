namespace FSharp.CodeWars

(*
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
*)
module BaseConversionFs =

    type Alphabet = char array

    let (bin:Alphabet) = [|'0';'1'|]
    let (oct:Alphabet) = [|'0'..'7'|]
    let (dec:Alphabet) = [|'0'..'9'|]
    let (hex:Alphabet) = Array.append [|'0'..'9'|] [|'a'..'f'|]
    let (alphaLower:Alphabet)    = [|'a'..'z'|]
    let (alphaUpper:Alphabet)    = [|'A'..'Z'|]
    let (alpha:Alphabet)         = Array.append [|'a'..'z'|] [|'A'..'Z'|]
    let (alphaNumeric:Alphabet)  = Array.append [|'0'..'9'|] (Array.append [|'a'..'z'|] [|'A'..'Z'|])

    let alphaMult (len:int) (i:int) (x:int) = (pown len i) * x
    let toInt (a:Alphabet) (c:string) =  
        c.ToCharArray()
        |> Array.map (fun chr -> Array.findIndex (fun elem -> chr = elem ) a)
        |> Array.mapi (fun i x -> (pown (Array.length a) ( 1 - c.Length - i)) * x )
        |> Array.sum


    let convert  (a:Alphabet) (b:Alphabet) (c:string) = c



    (* 
    convert alphaLower hex "hello" `shouldBe` "320048"

    abcdefghijklmnopqrstuvwxyz
    01234567890123456789012345

    7 4 11 11 14

    convert to array of ints
    multiply the ints based upon their alphabet length ^ index
    sum the values
    
    convert the decimal into the new base. 
    

    7  * 26 * 26 * 26 * 26 = 3198832
    4  * 26 * 26 * 26 = 70304
    11 * 26 * 26 = 7436
    11 * 26 = 286
    14 = 14

    3276872

    *)
