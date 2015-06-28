using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Threading;
using C5;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace KunukNykjaer
{

    /// <summary>
    /// Author: Kunuk Nykjaer
    /// </summary>
    public class ClosestPair
    {
        public static void Run(int n)
        {
            Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo("en-US");

            Action<object> write = Console.Write;
            var stopwatch = new Stopwatch();

            var algo = new Algorithm(n);

            // O(n log n)
            stopwatch.Start();
            var r = algo.Run();
            write("O(n log n)\n");
            write(string.Format("{0}\n{1}\n", r[0], r[1]));
            write(string.Format("Distance: {0}\n", r[0].Distance(r[1])));

            stopwatch.Stop();
            write(string.Format("\nDuration: {0}\n\n\n", stopwatch.Elapsed.ToString()));
            stopwatch.Reset();


            // O(n^2)
            stopwatch.Start();
            r = algo.Run2();
            write("O(n^2)\n");
            write(string.Format("{0}\n{1}\n", r[0], r[1]));
            write(string.Format("Distance: {0}\n", r[0].Distance(r[1])));

            stopwatch.Stop();
            write(string.Format("\nDuration: {0}\n\n", stopwatch.Elapsed.ToString()));
        }


        public class P : IComparable
        {
            private static int _counter;
            public int Id { get; private set; }
            public double X { get; set; } // x pos
            public double Y { get; set; } // y pos
            public P()
            {
                Id = ++_counter;
            }
            public override string ToString() { return string.Format("Id: {0}; X: {1}; Y: {2}", Id, X, Y); }
            public override bool Equals(object obj)
            {
                var other = obj as P;
                if (other == null) { return false; }
                return Id == other.Id;
            }
            public override int GetHashCode()
            {
                return Id.GetHashCode();
            }
            public int CompareTo(object obj)
            {
                var o = obj as P;
                if (o == null) return -1;

                return XComparer.XCompare(this, o); // default
            }

            public double Distance(P p)
            {
                var dx = p.X - X;
                var dy = p.Y - Y;

                var dist = (dx * dx) + (dy * dy);

                return dist;
            }
        }

        public class Algorithm
        {
            readonly List<P> _points = new List<P>();
            public int Distance { get; private set; }
            const double MaxDistance = 10000;

            public Algorithm(int n)
            {
                var rand = new Random();
                for (var i = 0; i < n; i++)
                {
                    _points.Add(new P
                    {
                        X = rand.Next(-10000, 10000),
                        Y = rand.Next(-10000, 10000),
                    });
                }
                _points.Sort();
            }

            public P[] Run()
            {
                return ClosestPair(_points);
            }
            public P[] Run2()
            {
                return NaiveClosestPair(_points);
            }


            /// <summary>
            /// adapted from
            /// http://www.baptiste-wicht.com/2010/04/closest-pair-of-point-plane-sweep-algorithm/
            /// </summary>
            /// <param name="points"></param>
            /// <returns></returns>
            static P[] ClosestPair(IEnumerable<P> points)
            {
                var closestPair = new P[2];

                // When we start the min distance is the infinity
                var crtMinDist = MaxDistance;

                // Get the points and sort them
                var sorted = new List<P>();
                sorted.AddRange(points);
                sorted.Sort(XComparer.XCompare);

                // When we start the left most candidate is the first one
                var leftMostCandidateIndex = 0;

                // Vertically sorted set of candidates            
                var candidates = new TreeSet<P>(new YComparer()); // C5 data structure

                // For each point from left to right
                foreach (var current in sorted)
                {
                    // Shrink the candidates
                    while (current.X - sorted[leftMostCandidateIndex].X > crtMinDist)
                    {
                        candidates.Remove(sorted[leftMostCandidateIndex]);
                        leftMostCandidateIndex++;
                    }

                    // Compute the y head and the y tail of the candidates set
                    var head = new P { X = current.X, Y = checked(current.Y - crtMinDist) };
                    var tail = new P { X = current.X, Y = checked(current.Y + crtMinDist) };

                    // We take only the interesting candidates in the y axis                
                    var subset = candidates.RangeFromTo(head, tail);

                    foreach (var point in subset)
                    {
                        var distance = current.Distance(point);
                        if (distance < 0) throw new ApplicationException("number overflow");

                        // Simple min computation
                        if (distance < crtMinDist)
                        {
                            crtMinDist = distance;
                            closestPair[0] = current;
                            closestPair[1] = point;
                        }
                    }

                    // The current point is now a candidate
                    candidates.Add(current);
                }

                return closestPair;
            }

            static P[] NaiveClosestPair(IEnumerable<P> points)
            {
                var min = MaxDistance;

                var closestPair = new P[2];

                foreach (var p1 in points)
                {
                    foreach (var p2 in points)
                    {
                        if (p1.Equals(p2)) continue;

                        var dist = p1.Distance(p2);
                        if (dist < min)
                        {
                            min = dist;
                            closestPair[0] = p1;
                            closestPair[1] = p2;
                        }
                    }
                }
                return closestPair;
            }
        }
        public class YComparer : IComparer<P>
        {
            public int Compare(P p1, P p2)
            {
                return YCompare(p1, p2);
            }

            public static int YCompare(P p1, P p2)
            {
                if (p1.Y < p2.Y) return -1;
                if (p1.Y > p2.Y) return 1;
                if (p1.X < p2.X) return -1;
                if (p1.X > p2.X) return 1;
                return 0;
            }
        }
        public class XComparer : IComparer<P>
        {
            public int Compare(P p1, P p2)
            {
                return XCompare(p1, p2);
            }

            public static int XCompare(P p1, P p2)
            {
                if (p1.X < p2.X) return -1;
                if (p1.X > p2.X) return 1;
                if (p1.Y < p2.Y) return -1;
                if (p1.Y > p2.Y) return 1;
                return 0;
            }
        }
    }

    [TestClass]
    public class ClosestPairAlgorithm
    {
        [TestMethod]
        public void Items10()
        {
            ClosestPair.Run(10);
        }

        [TestMethod]
        public void Items250()
        {
            ClosestPair.Run(250);
        }

        [TestMethod]
        public void Items3000()
        {
            ClosestPair.Run(3000);
        }
    }
}