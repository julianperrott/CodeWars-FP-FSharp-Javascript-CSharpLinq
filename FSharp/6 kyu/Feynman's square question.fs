namespace FSharp.CodeWars
(* http://www.codewars.com/kata/551186edce486caa61000f5c/train/haskell (6 kyu)
Feynman's squares

Richard Phillips Feynman was a well-known American physicist and a recipient of the Nobel Prize in Physics. He worked in theoretical physics and pioneered the field of quantum computing.

Recently, an old farmer found some papers and notes that are believed to have belonged to Feynman. Among notes about mesons and electromagnetism, there was a napkin where he wrote a simple puzzle: "how many different squares are there in a grid of NxN squares?".

For example, when N=2, the answer is 5: the 2x2 square itself, plus the four 1x1 squares in its corners:

(see disatoba-feynman.gif)

Task

You have to write a function

countSquares :: Integer -> Integer
that solves Feynman's question in general. The input to your function will always be a positive integer.

Examples

countSquares 1 =  1
countSquares 2 =  5
countSquares 3 = 14
(Adapted from the Sphere Online Judge problem SAMER08F by Diego Satoba)
*)

module Feynman_s_square_question =

    let countSquares n = [1..n] |> List.map (fun x -> x*x) |> List.sum
        


open Microsoft.VisualStudio.TestTools.UnitTesting
open FsUnit.MsTest
open NHamcrest.Core
open Feynman_s_square_question
open System

[<TestClass>] 
type ``Feynman_s_square_question tests`` ()=

    [<TestMethod>] member test.``Feynman_s_square 1``  ()= countSquares 1 |> should equal 1
    [<TestMethod>] member test.``Feynman_s_square 2``  ()= countSquares 2 |> should equal 5
    [<TestMethod>] member test.``Feynman_s_square 3``  ()= countSquares 3 |> should equal 14
    [<TestMethod>] member test.``Feynman_s_square 5``  ()= countSquares 5 |> should equal 55
    [<TestMethod>] member test.``Feynman_s_square 8``  ()= countSquares 8 |> should equal 204
    [<TestMethod>] member test.``Feynman_s_square 15`` ()= countSquares 15 |> should equal 1240

   