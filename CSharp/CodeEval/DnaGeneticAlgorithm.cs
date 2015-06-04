using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp
{
    public class DnaGeneticAlgorithm
    {
        //private string dnaA1 = "TATGCCCCGTCTAGCCGGGTGTTCCACCCGGTTTAAAGGAACGCACCCTAGAGCCAAACTTCAAGTCAAGTGAACATCCGAATGAATAGGCAATAGCTAAAAAAGAAGAAACCGGGACCCTCTCCGCTGGCAAATAGTTAACTCATACTAGGCTGGTTAGCGCACAAAGTCTCATTGCGTCAAGGGCCTTATCTCGGGATATCGGTCATCGGA";
        //private string dnaA2 = "TATGCGCCGGGACCTGGTCCTCCCCGTAATGCTTTGAACGCACCCTGAAAGGGAATTGAGCCAAATGTTAATTCAAGTGAACATGCTGGGGCCCGCCAGCCCCCGATAGCTAAACAAGAATTAACCGGGGTCCAGACCGCTGGAAAATATATTGCGTCAGGGAGTCCAAGGATGAAACGTCAGGGGGTGGCGGTCATCGGA";

        //private string dnaB1 = "CCGGTCGCAAGTGCTTCTTGCATCCCATTGAATCCGTATTTGAGGTGCGTTGTGCAAGTCGACGGTCGACCGAAATTGTCGCTGGCAAAGACCGGAAACCATGAACTTATCATTGTATGAGCATCCGATCTGGGTATGAGCGTTGCTAGTCCGACATT";
        //private string dnaB2 = "CCGGTCGCAAGTGCTAACGTGGTATCGGTATTCATAGGTTGCATGCTGTATATTTATTTACGTGAGAGAGCCTATAGTCTGCTGCCCGGTGCAAGCTCCCATTGAAGGACTTGCGTTCGTAAGACTATACCAACGGTCATTAATGAACGAGCATCCTGTAGGGGTACGAGAGTTGTTATCAGTTTTAGTAGCCCAACATT";

        //private string dnaC1 = "TCTACGTACAAATGGTCCAGAAACGTTATGGCTAAAGTACGTACAATATCATGGGAGAATAGTCCTCTTGAGTACTAAGAGGACTCAGTTTACACCAGTGAGTCCAAGATAAGACTGCCTCTGGGTACAGCACGTCACAGTGTCACCACTTATAGACAGTCAGATTGGTAGTAGGTTCGCTCGGACCCCTCGCCGCGCGGAAGTGTAATGTCCGTCCG";
        //private string dnaC2 = "TCTACGGCGACAAATGGTGCCCGACCTTCGTGATGTACTTAGCCGGACGAACTCAGTTTGCACCTGTGAGTCCAAGATAAGAGTGCCTCTGGGCGCAGCACGACTCGTTACGTAAGAGGACCCATTTGCGAATAACGGCGAAACGACCATCGATCCAGAAAGGTCCG";

        private static Random rand = new Random(DateTime.Now.Millisecond);

        // The generate method generates a random chromosome of a given length
        public static List<int> Generate(int items, int valueUpperRange)
        {
            List<int> r = new List<int>();

            while (r.Count < items)
            {
                r = r.Concat(new List<int> { rand.Next(0, valueUpperRange) })
                    .Distinct()
                    .ToList();
            }

            return r.OrderBy(s => s).ToList();
        }

        // generate n items
        public static List<List<int>> GenerateN(int n, int items, int valueUpperRange)
        {
            return Enumerable.Range(0, n)
                .Select(s => Generate(items, valueUpperRange))
                .ToList();
        }

        //The select method will take a population and a corresponding list of fitnesses and return a chromosome
        // selected with the roulette wheel method.
        public static List<int> Select(List<Tuple<List<int>, int>> population, int fitnessSum)
        {
            var next = rand.Next(10, 101) * fitnessSum / 100;
            return SelectChoice(population, next);
        }

        public static List<int> SelectChoice(List<Tuple<List<int>, int>> population, int rouletteValue)
        {

            var total = 0;
            for (var i = 0; i < population.Count; i++)
            {
                total += population[i].Item2;
                if (total >= rouletteValue) { return population[i].Item1; }
            }
            throw new Exception("invalid roulette wheel value!");
        }

        public static int FitnessesSum(List<Tuple<List<int>, int>> population)
        {
            return population.Aggregate(0, (prev, current) => { return prev + current.Item2; });
        }

        // The mutate method takes in one chromosomes and a probability and returns a mutated chromosome.
        public static List<int> Mutate(List<int> chromo, double probabilityOfMutation, int valueUpperRange)
        {
            long length = chromo.Count();

            List<int> r = chromo
                .Select(i => rand.NextDouble() > probabilityOfMutation ? -1 : i)
                .Where(i => i >= 0)
                .ToList();

            while (r.Count < length)
            {
                r = r.Concat(new List<int> { rand.Next(0, valueUpperRange) })
                    .Distinct()
                    .ToList();
            }

            return r.OrderBy(s => s).ToList();
        }

        // The crossover method takes in two chromosomes and returns a crossed-over pair.
        public static List<int> Crossover(List<int> chromosome1, List<int> chromosome2)
        {
            return Crossover(chromosome1, chromosome2, 1 + rand.Next(0, chromosome1.Count()), rand.Next(0, 100) < 50);
        }

        public static List<int> Crossover(List<int> chromosome1, List<int> chromosome2, int position, bool reverse)
        {
            return chromosome1
                .Take(position)
                .Concat(reverse ? chromosome2.Reverse<int>() : chromosome2)
                .Distinct()
                .Take(chromosome1.Count)
                .OrderBy(s => s)
                .ToList();
        }

        public static int Fitness(List<int> items, string chromoLong, string chromoShort)
        {
            char[] paddedChromo = GetComparisonChromo(items, chromoLong, chromoShort);
            var result = CalcFitness(chromoLong.ToCharArray(), paddedChromo);
            return result;
        }

        public static int CalcFitness(char[] chromoPrimary, char[] paddedChromo)
        {
            var result = Enumerable.Range(0, chromoPrimary.Length)
                .Select(i =>
                {
                    if (chromoPrimary[i] == paddedChromo[i]) { return 3; } // Match: +3
                    if (paddedChromo[i] != '-') 
                    {
                        if (chromoPrimary[i] != '-')
                        {
                            return -3; // Mismatch: -3
                        }
                        // Indel
                        if (i == 0 || (i > 0 && chromoPrimary[i - 1] != '-')) { return -8; } // Indel start: -8
                        return -1;  // Indel extension: -1
                    } 
                    //Indel
                    if (i == 0 || (i > 0 && paddedChromo[i - 1] != '-')) { return -8; } // Indel start: -8
                    return -1;  // Indel extension: -1
                }).Sum();

            return result;
        }

        public static char[] GetComparisonChromo(List<int> items, string chromoLong, string chromoShort)
        {
            char[] paddedChromo = new char[chromoLong.Length];
            items.ForEach(i => paddedChromo[i] = '-');

            int n = 0;
            var chars = chromoShort.ToCharArray();
            for (int i = 0; i < chars.Length; i++)
            {
                while (paddedChromo[n] == '-') { n++; } // find the next empty space

                if (n > chromoLong.Length)
                {
                    throw new Exception("Too many characters to fit in chromo");
                }

                paddedChromo[n] = chars[i];
                n++;
            }

            for (int i = 0; i < paddedChromo.Length; i++)
            {
                if (paddedChromo[i] == '\0')
                {
                    throw new Exception("Chromosome was not filled to the correct length");
                }
            }
     
            return paddedChromo;
        }

        public static Tuple<List<int>, int> Run(string chromoLong, string chromoShort, double probabilityOfCrossover, double probabilityOfMutation)
        {
            Func<List<int>, Tuple<List<int>, int>> fitnessFunc = l =>
            {
                return new Tuple<List<int>, int>(l, Fitness(l, chromoLong, chromoShort));
            };

            int items = chromoLong.Length - chromoShort.Length;
            int valueUpperRange = chromoLong.Length;
            return Run(fitnessFunc, items, valueUpperRange, probabilityOfCrossover, probabilityOfMutation);
        }

        public static Tuple<List<int>, int> Run(Func<List<int>, Tuple<List<int>, int>> fitnessFunc, int items, int valueUpperRange, double probabilityOfCrossover, double probabilityOfMutation)
        {
            var iterations = 1000;

            // get 200 chromosomes
            var population = GenerateN(200, items, valueUpperRange);

            Tuple<List<int>, int> best = null;

            // loop n times
            for (var i = 0; i < iterations; i++)
            {

                var populationWithFitness = population
                        .Select(fitnessFunc)
                        .ToList();

                var localFittest = populationWithFitness.OrderByDescending(s => s.Item2).First();
                if (best == null) { best = localFittest; }
                if (localFittest.Item2 > best.Item2) 
                { 
                    best = localFittest;
                }

                // ensure that the are no negative fitness
                int min = populationWithFitness.Min(s => s.Item2);
                if (min < 0)
                {
                    populationWithFitness = populationWithFitness
                        .Select(s => new Tuple<List<int>, int>(s.Item1, s.Item2 + (Math.Abs(min))))
                        .ToList();
                }

                int fitnessSum = FitnessesSum(populationWithFitness);

                //System.Diagnostics.Debug.WriteLine("Iteration " + i + " best: " + best.Item2 + ", fitness sum:" + fitnessSum);

                //create a new population
                population = populationWithFitness
                    .Select(s => Select(populationWithFitness, fitnessSum)) //pick via roulette
                    .Select(s => Mutate(s, probabilityOfMutation, valueUpperRange)) // Mutate
                    .ToList();

                // crossover
                population = population
                    .Select(s => rand.NextDouble() > probabilityOfCrossover ? s : Crossover(s, population[rand.Next(0, population.Count())]))
                    .ToList();
            }

            return best;
        }
    }

    [TestClass]
    public class DnaGeneticAlgorithmTests
    {
        List<int> c1 = new List<int> { 3, 5, 7, 8, 12, 14, 42 };
        List<int> c2 = new List<int> { 4, 6, 7, 14, 15, 23, 45 };

        [TestMethod]
        public void Crossover_Not_Reversed()
        {
            var result = string.Join(",", DnaGeneticAlgorithm.Crossover(c1, c2, 4, false));
            Assert.AreEqual("3,4,5,6,7,8,14", result);
        }

        [TestMethod]
        public void Crossover_Reverse()
        {
            var result = string.Join(",", DnaGeneticAlgorithm.Crossover(c1, c2, 4, true));
            Assert.AreEqual("3,5,7,8,15,23,45", result);
        }

        [TestMethod]
        public void Crossover_Reverse6()
        {
            var result = string.Join(",", DnaGeneticAlgorithm.Crossover(c1, c2, 6, true));
            Assert.AreEqual("3,5,7,8,12,14,45", result);
        }

        [TestMethod]
        public void Crossover_Reverse1()
        {
            var result = string.Join(",", DnaGeneticAlgorithm.Crossover(c1, c2, 1, true));
            Assert.AreEqual("3,6,7,14,15,23,45", result);
        }

        [TestMethod]
        public void Crossover_Random()
        {
            var result = string.Join(",", DnaGeneticAlgorithm.Crossover(c1, c2));
            Assert.AreNotEqual(string.Join(",",c1), result);
            Assert.AreNotEqual(string.Join(",", c2), result);

            for (int i = 0; i < 100; i++)
            {
                System.Diagnostics.Debug.WriteLine(string.Join(",", DnaGeneticAlgorithm.Crossover(c1, c2)));
            }
        }

        [TestMethod]
        public void Mutate_Random()
        {
            var result = string.Join(",", DnaGeneticAlgorithm.Mutate(c1, 0.5, 100));
            Assert.AreNotEqual(string.Join(",", c1), result);

            for (int i = 0; i < 100; i++)
            {
                System.Diagnostics.Debug.WriteLine(string.Join(",", DnaGeneticAlgorithm.Mutate(c1, 0.5, 100)));
            }
        }

        
        [TestMethod]
        public void Generate_Single()
        {
            for (int i = 0; i < 1000; i++)
            {
                var r = DnaGeneticAlgorithm.Generate(10, 100);
                Assert.AreEqual(10, r.Count());
                Assert.IsFalse(r.Any(s => s >= 100));
                System.Diagnostics.Debug.WriteLine(string.Join(",", r));
            }
        }

        [TestMethod]
        public void GenerateN()
        {
            var n = DnaGeneticAlgorithm.GenerateN(50, 10, 100);
            Assert.AreEqual(50, n.Count());

            n.ForEach(r => System.Diagnostics.Debug.WriteLine(string.Join(",", r)));
        }

        [TestMethod]
        public void FitnessSum()
        {
            List<Tuple<List<int>, int>> population = new List<Tuple<List<int>, int>>()
            {
                new Tuple<List<int>, int>(new List<int>{1,1,1}, 36),
                new Tuple<List<int>, int>(new List<int>{2,2,2}, 44),
                new Tuple<List<int>, int>(new List<int>{3,3,3}, 14),
                new Tuple<List<int>, int>(new List<int>{4,4,4}, 14),
                new Tuple<List<int>, int>(new List<int>{5,5,5}, 56),
                new Tuple<List<int>, int>(new List<int>{6,6,6}, 54),
            };

            int fs = DnaGeneticAlgorithm.FitnessesSum(population);
            Assert.AreEqual(218, fs);
        }

        [TestMethod]
        public void SelectChoice()
        {
            List<Tuple<List<int>, int>> population = new List<Tuple<List<int>, int>>()
            {
                new Tuple<List<int>, int>(new List<int>{1,1,1}, 36),
                new Tuple<List<int>, int>(new List<int>{2,2,2}, 44),
                new Tuple<List<int>, int>(new List<int>{3,3,3}, 14),
                new Tuple<List<int>, int>(new List<int>{4,4,4}, 14),
                new Tuple<List<int>, int>(new List<int>{5,5,5}, 56),
                new Tuple<List<int>, int>(new List<int>{6,6,6}, 54),
            };

            Assert.AreEqual(1, DnaGeneticAlgorithm.SelectChoice(population, 0)[0]);
            Assert.AreEqual(2, DnaGeneticAlgorithm.SelectChoice(population, 37)[0]);
            Assert.AreEqual(6, DnaGeneticAlgorithm.SelectChoice(population, 217)[0]);
        }

        [TestMethod]
        public void GetComparisonChromo()
        {
            string expectedResult = "ab--ef-hi-klmno-";
            var list = GetList(expectedResult);

            char[] newChrom = DnaGeneticAlgorithm.GetComparisonChromo(list, "abcdefghijklmnop", expectedResult.Replace("-",""));
            Assert.AreEqual(expectedResult, new string(newChrom));
        }

        private static List<int> GetList(string expectedResult)
        {
            var list = new List<int>();
            for (int i = 0; i < expectedResult.Length; i++)
            {
                if (expectedResult.ToCharArray()[i] == '-')
                {
                    list.Add(i);
                }
            }
            return list;
        }

        [TestMethod]
        public void CalcFitness()
        {
            Assert.AreEqual(-13, DnaGeneticAlgorithm.CalcFitness("GAAAAAAT".ToCharArray(), "G--A-A-T".ToCharArray()));
            Assert.AreEqual(1, DnaGeneticAlgorithm.CalcFitness("GAAAAAAT".ToCharArray(), "GAA----T".ToCharArray()));
            Assert.AreEqual(-13, DnaGeneticAlgorithm.CalcFitness("G--A-A-T".ToCharArray(), "GAAAAAAT".ToCharArray()));
            Assert.AreEqual(1, DnaGeneticAlgorithm.CalcFitness("GAA----T".ToCharArray(), "GAAAAAAT".ToCharArray()));
        }

        [TestMethod]
        public void CalcFitness2()
        {
            string c1 ="TATGCCCCGTCTAGCCGGGTGTTCCACCCGGTTTAAAGGAACGCACCCT--------A--GAGCCAAACTTCAAGTCAAGTGAACAT-C---CGAATG--AATAGGCAATAGCTAAAAAAGAAGAAACCGGGACCCTCTCCGCTGGCAAATAGTTAACTCATACTAGGCTGGTTAGCGCACAAAGTCTCATTGCGTCAAGGGCCTTATCTCGGGATATCGGTCATCGGA";
            string c2 ="TATGCGCCG-GGA-CCTGGTCCTCC-CCGTAATGCTTTGAACGCACCCTGAAAGGGAATTGAGCCAAATGTTAATTCAAGTGAACATGCTGGGGCCCGCCAGCCCCCGATAGCTAAACAAGAATTAACCGGGGTCCAGACCGCTGG-AAA-A--T-A-T-AT--T--GC--GTCAG-G----GAGTC-CA-AG-G--ATGAAAC--GTCAGGGGGTGGCGGTCATCGGA";

            Assert.AreEqual(43,DnaGeneticAlgorithm.CalcFitness(c1.ToCharArray(),c2.ToCharArray()));
            Assert.AreEqual(43, DnaGeneticAlgorithm.CalcFitness(c2.ToCharArray(), c1.ToCharArray()));
        }

        [TestMethod]
        public void CalcFitness3()
        {
            string c1 = "TCTACGTACAAATGGTCCAGAAACGTTATGGCTAAAGTACGTACAATATCATGGGAGAATAGTCC-TCTTGA-GTAC-TA---AGA-GGACTCAGTTTACACCAGTGAGTCCAAGATAAGACTGCCTCTGGGTACAGCACGTCACAGTGTCACCACTTATAGACAGTCAGATTGGTAGTAGGTTCGCTCGGACCCCTCGCCGCGCGGAAGTGTAATGTCCGTCCG";
            string c2 = "-----------------------------------TCTACG-GCGACA-AAT-GGTG-CCCGACCTTCGTGATGTACTTAGCCGGACGAACTCAGTTTGCACCTGTGAGTCCAAGATAAGAGTGCCTCTGGGCGCAGCACGACTC-GT-T----ACGTA-AGA-GGACCCATT--T-G-CGAAT--AACGG-CGAAACG--AC-C---A-T-CGA--TCCAGAAA";

            Assert.AreEqual(-49,DnaGeneticAlgorithm.CalcFitness(c1.ToCharArray(),c2.ToCharArray()));
            Assert.AreEqual(-49, DnaGeneticAlgorithm.CalcFitness(c2.ToCharArray(), c1.ToCharArray()));
        }



        [TestMethod]
        public void Fitness()
        {
            string chromoShort = "G--A-A-T";
            var list = GetList(chromoShort);
            Assert.AreEqual(-13,DnaGeneticAlgorithm.Fitness(list,"GAAAAAAT",chromoShort.Replace("-","")));
        }

        [TestMethod]
        public void Run_GAAAAAAT()
        {
            var result = DnaGeneticAlgorithm.Run("GAAAAAAT", "GAAT", 0.6, 0.002);
        }

        [TestMethod]
        public void Run_TATG()
        {
            //string c1= "TATGCCCCGTCTAGCCGGGTGTTCCACCCGGTTTAAAGGAACGCACCCTAGAGCCAAACTTCAAGTCAAGTGAACATCCGAATGAATAGGCAATAGCTAAAAAAGAAGAAACCGGGACCCTCTCCGCTGGCAAATAGTTAACTCATACTAGGCTGGTTAGCGCACAAAGTCTCATTGCGTCAAGGGCCTTATCTCGGGATATCGGTCATCGGA";
            //string c2 = "TATGCGCCGGGACCTGGTCCTCCCCGTAATGCTTTGAACGCACCCTGAAAGGGAATTGAGCCAAATGTTAATTCAAGTGAACATGCTGGGGCCCGCCAGCCCCCGATAGCTAAACAAGAATTAACCGGGGTCCAGACCGCTGGAAAATATATTGCGTCAGGGAGTCCAAGGATGAAACGTCAGGGGGTGGCGGTCATCGGA";

            //for (int i = 0; i < 100; i++)
            //{
            //    var result = DnaGeneticAlgorithm.Run(c1, c2, 0.5, 0.2);
            //    Console.Write("best: " + result.Item2);
            //    System.Diagnostics.Debug.WriteLine("best: " + result.Item2);
            //}
        }



        
    }
}