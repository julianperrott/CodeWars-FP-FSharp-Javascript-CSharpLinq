namespace FSharp.CodeWars

open System

(* http://www.codewars.com/kata/5530b10808541c24330000b4/train/haskell

Welcome to this Kata. In this Kata you will be given a string. Your task is to replace every character with the letter following it in the alphabet
(for example, "b" should be "c", "z" should be "a" and capital "Z" should be "A").

The test cases would not have any special symbols or numbers but it will have spaces. And the upper and lower cases should be retained in your output.

For Example:

letterChange "Lorem Ipsum" `shouldBe` "Mpsfn Jqtvn"
*)

module LetterChangeFs =

    let nextChar (c:char) =
        match c with
        | 'Z' -> 'A'
        | 'z' -> 'a'
        | ' ' -> ' '
        | a -> char ((int c) + 1)

    let letterChange (str:string) = new String(str.ToCharArray() |> Array.map nextChar);