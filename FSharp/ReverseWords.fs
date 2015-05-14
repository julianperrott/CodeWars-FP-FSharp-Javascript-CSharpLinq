namespace FSharp.CodeWars
(* http://www.codewars.com/kata/51c8991dee245d7ddf00000e/train/haskell
Complete the solution so that it reverses all of the words within the string passed in.

Example:

reverseWords "The greatest victory is that which requires no battle"
-- should return "battle no requires which that is victory greatest The"
*)

module ReverseWordsFs = 
    let reverseWords (str:System.String) = System.String.Join(" ", str.Split(' ') |> Array.rev )


open Microsoft.VisualStudio.TestTools.UnitTesting
open FsUnit.MsTest
open NHamcrest.Core
open ReverseWordsFs
open System

[<TestClass>] 
type ``ReverseWordsFs Tests`` ()=

    [<TestMethod>] member test. ``ReverseWordsFs hello world``
        ()=  reverseWords "hello world!" |> should equal "world! hello" 

    [<TestMethod>] member test. ``ReverseWordsFs yoda``
        ()=  reverseWords "yoda doesn't speak like this" |> should equal "this like speak doesn't yoda"

    [<TestMethod>] member test. ``ReverseWordsFs foobar``
        ()=  reverseWords "foobar" |> should equal "foobar" 

    [<TestMethod>] member test. ``ReverseWordsFs 4 items``
        ()=  reverseWords "boat your row row row" |> should equal "row row row your boat" 



 