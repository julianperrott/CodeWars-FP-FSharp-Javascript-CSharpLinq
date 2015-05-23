namespace FSharp.CodeWars

(* http://www.codewars.com/kata/5326ef17b7320ee2e00001df/train/haskell (2 kyu)

A poor miner is trapped in a mine and you have to help him to get out !

Only, the mine is all dark so you have to tell him where to go.

In this kata, you will have to implement a method solve(map, miner, exit) that has to return the path the miner must take to reach the exit as an array of moves, 
such as : ['up', 'down', 'right', 'left']. 
There are 4 possible moves, up, down, left and right, no diagonal.

map is a 2-dimensional array of boolean values, representing squares. false for walls, true for open squares (where the miner can walk). 
It will never be larger than 5 x 5. It is laid out as an array of columns. All columns will always be the same size, though not necessarily 
the same size as rows (in other words, maps can be rectangular). The map will never contain any loop, so there will always be only one possible path. 
The map may contain dead-ends though.

miner is the position of the miner at the start, as an object made of two zero-based integer properties, x and y. For example {x:0, y:0} would 
be the top-left corner.

exit is the position of the exit, in the same format as miner.

Note that the miner can't go outside the map, as it is a tunnel.

Let's take a pretty basic example :

let map = [[True, False],
           [True, True]]

solve map (0,0) (1,1)
-- Should return [R, D]
*)

module EscapeTheMines = 
    let verticalSlice ar = 
        [| for i in 0..8 -> Array.map (fun (x : int []) -> x.[i]) ar |]
    
    type XY = int * int
    type Move = U | D | R | L


    //solve :: [[Bool]] -> XY -> XY -> [Move] 
    let solve (grid : bool[][]) (miner : XY) (exit : XY) = [U]

open Microsoft.VisualStudio.TestTools.UnitTesting
open FsUnit.MsTest
open NHamcrest.Core
open EscapeTheMines
open System

[<TestClass>]
type EscapeTheMines_tests() = 
    
//    [<TestMethod>]
//    member test.``Array is finished``() = doneOrNot finished |> should equal "Finished!"
//    
//    [<TestMethod>]
//    member test.``Array is not finished``() = doneOrNot notFinished |> should equal "Try again!"
//
//
//  describe "A trivial map (1x1)" $ do
//    let map = [[True]];
//    it "Should return an empty list, since we're already at the goal" $ do
//      solve map (0,0) (0,0) `shouldBe` []
//      
//  describe "A pretty simple map (2x2)" $ do
//    let map = unmap [" #"
//                    ,"  "
//                    ]
//    it "Should return the only correct move" $ do
//      solve map (0,0) (1,0) `shouldBe` [R]
//      
//    it "Should return the only moves necessary" $ do
//      solve map (0,0) (1,1) `shouldBe` [R, D]
//      
//      
//  describe "A linear map(1x4)" $ do
//    let map = unmap [" "
//                    ," "
//                    ," "
//                    ," "
//                    ]
//
//    it "Should return a chain of moves to the right" $ do
//      solve map (0,0) (3,0) `shouldBe` [R, R, R]
//
//    it "Should return a chain of moves to the left" $ do
//      solve map (3,0) (0,0) `shouldBe` [L, L, L]
//
//  describe "Should walk around an obstacle (3x3 map)" $ do
//    let map = unmap ["   "
//                    ,"## "
//                    ,"   "
//                    ]
//
//    it "Should return the right sequence of moves" $ do
//      solve map (0,0) (2,0) `shouldBe` [D, D, R, R, U, U]
//
//  describe "Should be able to change directions multiple times (5x5 map)" $ do
//    let map = unmap ["  ###"
//                    ,"#  ##"
//                    ,"##  #"
//                    ,"###  "
//                    ,"#### "
//                    ]
//
//    it "Should return a step sequence of moves" $ do
//      solve map (0,0) (4,4) `shouldBe` [D, R, D, R, D, R, D, R]
//
//  describe "Should avoid dead-ends (5x5 map)" $ do
//    let map = unmap ["   ##"
//                    ,"## # "
//                    ,"     "
//                    ," # ##"
//                    ,"#    "
//                    ]
//
//    it "Should return the right moves" $ do
//      solve map (0,0) (4,4) `shouldBe` [D, D, R, R, R, R, D, D]
//      
//unmap = map (map (== ' '))    


 let xx =["   ##"
                    ;"## # "
                    ;"     "
                    ;" # ##"
                    ;"#    "
                    ]

let toTF xs = Seq.map (fun x-> x='#') xs

xx |> List.map (fun x->toTF x)