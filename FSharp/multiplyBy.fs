namespace FSharp.CodeWars

(* http://www.codewars.com/kata/55252a50de8b4bac00000805

Write a function to multiply a number (x) by a given number (y) a certain number of times (n). The results are to be returned in an array.

eg. multiplyBy(2, 4, 6);
The output is: [8, 32, 128, 512, 2048, 8192]

NB: all arguments (x,y and n) will always be integers. Times (n) will always be a positive integer.
*)

module MultiplyByFs =
    let multiplyHeadAndAppend xs x = List.append [List.head xs * x] xs // xs:int list -> x:int -> int list
    let multiplyBy x y n = // x:int -> y:int -> n:int -> int list
        List.fold multiplyHeadAndAppend [x*y] [ for i in 2..n -> y ] 
        |> List.rev;

    let rec multiplyByV2 x y n = // x:int -> y:int -> n:int -> int list
        match n with
        | 0 -> []
        | 1 -> [x * y]
        | _ -> List.append [x * y] (multiplyByV2 (x*y) y (n-1))



//#load "C:\Projects\FSharp\Library1.fs";;