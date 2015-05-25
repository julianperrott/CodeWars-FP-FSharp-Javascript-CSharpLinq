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
    open System
    open System.Diagnostics

    type XY = int * int // row * col (R+1 L-1, D+1 U-1)

    type Move =
        | U
        | D
        | R
        | L
        override this.ToString() =
            if this = Move.U then "U"
            elif this = Move.D then "D"
            elif this = Move.R then "R"
            elif this = Move.L then "L"
            else "?"

    let isVisited (grid : bool [] []) (pos : XY) =
        match pos with
        | (x, y) when x < 0 -> true
        | (x, y) when y < 0 -> true
        | (x, y) when x >= grid.Length -> true
        | (x, y) when y >= grid.[0].Length -> true
        | (x, y) -> grid.[x].[y]

    let move (x, y) (step : Move) =
        match step with
        | Move.D -> (x, y + 1)
        | Move.U -> (x, y - 1)
        | Move.L -> (x - 1, y)
        | Move.R -> (x + 1, y)

    let setRowVisited (row : array<bool>) col = Array.append [| true |] row.[col + 1..] |> Array.append row.[0..col - 1]
    let setVisited (grid : array<array<bool>>) (pos : XY) =
        Array.append [| (setRowVisited grid.[fst pos] (snd pos)) |] grid.[(fst pos) + 1..]
        |> Array.append grid.[0..(fst pos) - 1]

    // brute force explore all paths - this max grid size is only 5X5 !
    let rec explore (grid : array<array<bool>>) (pos : XY) (exit : XY) (path : array<Move>) =
        Debug.WriteLine("visiting ({0},{1}) - {2}", (fst pos), (snd pos), String.Join(",", path))
        [| Move.U; Move.D; Move.R; Move.L |]
        |> Array.map (fun step ->
               let newPos = move pos step
               let newPath = Array.append path [| step |]
               if isVisited grid newPos then [||]
               elif newPos = exit then newPath
               else explore (setVisited grid newPos) newPos exit newPath)
        |> Array.filter (fun x -> Array.length x > 0)
        |> (fun x ->
        if Array.length x > 0 then x.[0]
        else [||])

    let solve (grid : array<array<bool>>) (miner : XY) (exit : XY) = explore grid miner exit [||]

open Microsoft.VisualStudio.TestTools.UnitTesting
open FsUnit.MsTest
open NHamcrest.Core
open EscapeTheMines
open System

[<TestClass>]
type EscapeTheMines_tests() =
    let toTF xs = Seq.map (fun x -> x = '#') xs
    let map xs = List.map (fun x -> toTF x |> Seq.toArray) xs |> List.toArray
    let simpleMap = map [ " #"; "  " ]
    let linearMap = map [ " "; " "; " "; " " ]
    let obstacleMap = map [ "   "; "## "; "   " ]
    let changeDirMap = map [ "  ###"; "#  ##"; "##  #"; "###  "; "#### " ]
    let deadEndMap = map [ "   ##"; "## # "; "     "; " # ##"; "#    " ]
    let (st1 : XY) = (0, 0) // top left
    let (en1 : XY) = (4, 4) // top left
    let forth (_, _, _, c) = c
    let join (path : array<Move>) = String.Join(",", path)

    [<TestMethod>]
    member test.``EscapeTheMines Should return an empty list, since we're already at the goal``() =
        solve [| [| true |] |] (0, 0) (0, 0)
        |> join
        |> should equal ""

    [<TestMethod>]
    member test.``EscapeTheMines Should return the only correct move``() =
        solve simpleMap (0, 0) (1, 0)
        |> join
        |> should equal "R"

    [<TestMethod>]
    member test.``EscapeTheMines Should return the only moves necessary``() =
        solve simpleMap (0, 0) (1, 1)
        |> join
        |> should equal "R,D"

    [<TestMethod>]
    member test.``EscapeTheMines Should return a chain of moves to the right``() =
        solve linearMap (0, 0) (3, 0)
        |> join
        |> should equal "R,R,R"

    [<TestMethod>]
    member test.``EscapeTheMines Should return a chain of moves to the left``() =
        solve linearMap (3, 0) (0, 0)
        |> join
        |> should equal "L,L,L"

    [<TestMethod>]
    member test.``EscapeTheMines Should walk around an obstacle``() =
        solve obstacleMap (0, 0) (2, 0)
        |> join
        |> should equal "D,D,R,R,U,U"

    [<TestMethod>]
    member test.``EscapeTheMines Should be able to change directions multiple times (5x5 map)``() =
        solve changeDirMap (0, 0) (4, 4)
        |> join
        |> should equal "D,R,D,R,D,R,D,R"

    [<TestMethod>]
    member test.``EscapeTheMines Should avoid dead-ends (5x5 map)``() =
        solve deadEndMap (0, 0) (4, 4)
        |> join
        |> should equal "D,D,R,R,R,R,D,D"

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (0,0)``() = isVisited deadEndMap (0, 0) |> should equal false

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (0,1)``() = isVisited deadEndMap (0, 1) |> should equal false

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (0,2)``() = isVisited deadEndMap (0, 2) |> should equal false

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (0,3)``() = isVisited deadEndMap (0, 3) |> should equal true

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (0,4)``() = isVisited deadEndMap (0, 4) |> should equal true

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (0,5) outside mine``() =
        isVisited deadEndMap (0, 5) |> should equal true

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (5,0) outside mine``() =
        isVisited deadEndMap (5, 0) |> should equal true

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (0,-1) outside mine``() =
        isVisited deadEndMap (0, -1) |> should equal true

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (-1,0) outside mine``() =
        isVisited deadEndMap (-1, 0) |> should equal true

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (1,0)``() = isVisited deadEndMap (1, 0) |> should equal true

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (2,0)``() = isVisited deadEndMap (2, 0) |> should equal false

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (3,0)``() = isVisited deadEndMap (3, 0) |> should equal false

    [<TestMethod>]
    member test.``EscapeTheMines isVisited mine1 (4,0)``() = isVisited deadEndMap (4, 0) |> should equal true

    [<TestMethod>]
    member test.``EscapeTheMines setRowVisited pos0``() =
        setRowVisited [| false; false; false |] 0 |> should equal [| true; false; false |]

    [<TestMethod>]
    member test.``EscapeTheMines setRowVisited pos1``() =
        setRowVisited [| false; false; false |] 1 |> should equal [| false; true; false |]

    [<TestMethod>]
    member test.``EscapeTheMines setRowVisited pos2``() =
        setRowVisited [| false; false; false |] 2 |> should equal [| false; false; true |]

    [<TestMethod>]
    member test.``EscapeTheMines setVisited (0,0)``() =
        setVisited [| [| false; false; false |]
                      [| false; false; false |]
                      [| false; false; false |] |] (0, 0)
        |> should equal [| [| true; false; false |]
                           [| false; false; false |]
                           [| false; false; false |] |]

    [<TestMethod>]
    member test.``EscapeTheMines setVisited (1,0)``() =
        setVisited [| [| false; false; false |]
                      [| false; false; false |]
                      [| false; false; false |] |] (1, 0)
        |> should equal [| [| false; false; false |]
                           [| true; false; false |]
                           [| false; false; false |] |]

    [<TestMethod>]
    member test.``EscapeTheMines setVisited (2,0)``() =
        setVisited [| [| false; false; false |]
                      [| false; false; false |]
                      [| false; false; false |] |] (2, 0)
        |> should equal [| [| false; false; false |]
                           [| false; false; false |]
                           [| true; false; false |] |]

    [<TestMethod>]
    member test.``EscapeTheMines setVisited (2,2)``() =
        setVisited [| [| false; false; false |]
                      [| false; false; false |]
                      [| false; false; false |] |] (2, 2)
        |> should equal [| [| false; false; false |]
                           [| false; false; false |]
                           [| false; false; true |] |]