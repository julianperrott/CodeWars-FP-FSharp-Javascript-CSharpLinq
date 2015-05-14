namespace FSharp.CodeWars
(* http://www.codewars.com/kata/54da539698b8a2ad76000228/train/haskell
You live in the city of Cartesia where all roads are laid out in a perfect grid. 

You arrived ten minutes too early to an appointment, so you decided to take the opportunity to go for a short walk. 
The city provides its citizens with a Walk Generating App on their phones -- 
everytime you press the button it sends you an array of one-letter strings representing directions to walk 
(eg. ['n', 's', 'w', 'e']). 

You know it takes you one minute to traverse one city block, 
so create a function that will return true if the walk the app gives you will take you exactly ten minutes 
(you don't want to be early or late!) and will, of course, return you to your starting point. 

Return false otherwise.

Note: you will always receive a valid array containing a random assortment of direction letters ('n', 's', 'e', or 'w' only). 
It will never give you an empty array (that's not a walk, that's standing still!).
*)

module TenMinuteWalkFs = 

    let isValidWalk (walk:char[]) =
        let move ch = 
            match ch with
            | 'n' -> (1,0)
            | 's' -> (-1,0)
            | 'e' -> (0,1)
            | 'w' -> (0,-1)
            | _ -> (0,0)

        if walk.Length <> 10 then false else
            Array.map move walk
            |> Array.reduce (fun acc item -> ((fst acc) + (fst item),(snd acc) + (snd item)) )
            |> (fun v -> fst v =0 && snd v = 0)
        



open Microsoft.VisualStudio.TestTools.UnitTesting
open FsUnit.MsTest
open NHamcrest.Core
open TenMinuteWalkFs
open System

[<TestClass>] 
type ``Ten Minute Walk Tests`` ()=

    let r = System.Random(DateTime.Now.Millisecond)

    let buildValidWalk n = 
        List.replicate n 's'
        |> List.append (List.replicate n 'n')
        |> List.append (List.replicate (5-n) 'w')
        |> List.append (List.replicate (5-n) 'e')
        |> List.toArray

    let randomMove n = ['n';'s';'e';'w'].[r.Next(4)]
    let buildRandomWalk n = [|1..n|] |> Array.map randomMove

    [<TestMethod>] member test.
        ``TenMinuteWalkFs Valid walk 1`` ()= 
        isValidWalk [|'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 's'|] 
        |> should be True

    [<TestMethod>] member test.
        ``TenMinuteWalkFs Valid walk 2`` ()= 
        isValidWalk [| 'n'; 's'; 'e'; 'w'; 'n'; 's'; 'e'; 'w'; 'n'; 's' |]  
        |> should be True

    [<TestMethod>] member test.
        ``TenMinuteWalkFs Invalid walk`` ()= 
        isValidWalk [| 'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 'n' |]  
        |> should be False

    [<TestMethod>] member test.
        ``TenMinuteWalkFs Invalid short walk`` ()= 
        isValidWalk [| 'n'; 's' |]  
        |> should be False
        
    [<TestMethod>] member test.
        ``TenMinuteWalkFs Invalid long walk`` ()= 
        isValidWalk [| 'n'; 's';'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 'n';'n'; 's';'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 'n';'n'; 's';'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 'n';'n'; 's';'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 's'; 'n'; 'n'; |]  
        |> should be False

    [<TestMethod>] member test.
        ``TenMinuteWalkFs Semi random walk`` ()= 
            [0..3]
            |> List.map buildValidWalk
            |> List.map (fun walk -> (walk, isValidWalk walk))
            |> List.map (fun r -> printfn "%s %b" (new string(fst r)) (snd r) |> (fun n -> snd r)  )
            |> List.map (should be True)
            |> ignore

    [<TestMethod>] member test.
        ``TenMinuteWalkFs Short random walks`` ()= 
            [1..10]
            |> List.map buildRandomWalk
            |> List.map (fun walk -> (walk, isValidWalk walk))
            |> List.map (fun r -> printfn "%s %b" (new string(fst r)) (snd r) |> (fun n -> snd r)  )
            |> List.map (should be False)
            |> ignore