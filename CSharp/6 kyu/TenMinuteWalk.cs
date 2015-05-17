/* http://www.codewars.com/kata/54da539698b8a2ad76000228/train/haskell
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
*/

namespace CSharp.Codewars
{
    using System.Linq;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    public partial class TenMinuteWalkCs
    {
        public static bool isValidWalk(char[] walk)
        {
            Func<char, int> count = (match) => { return walk.Where(c => c == match).Count(); }; 
            return walk.Length == 10 && count('n') == count('s') && count('e') == count('w');
        }
    }

    [TestClass]
    public class TenMinuteWalkCsTests
    {
        [TestMethod]
        public void TenMinuteWalkCs_ValidWalk_True()
        {
            Assert.AreEqual(true, TenMinuteWalkCs.isValidWalk(new char[] { 'n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 's' }));
        }

        [TestMethod]
        public void TenMinuteWalkCs_ValidWalk2_True()
        {
            Assert.AreEqual(true, TenMinuteWalkCs.isValidWalk(new char[] { 'n', 's', 'e', 'w', 'n', 's', 'e', 'w', 'n', 's' }));
        }

        [TestMethod]
        public void TenMinuteWalkCs_InValidWalk_false()
        {
            Assert.AreEqual(false, TenMinuteWalkCs.isValidWalk(new char[] { 'n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 'n' }));
        }

        [TestMethod]
        public void TenMinuteWalkCs_ShortWalk_False()
        {
            Assert.AreEqual(false, TenMinuteWalkCs.isValidWalk(new char[] { 'n', 's' }));
        }

        [TestMethod]
        public void TenMinuteWalkCs_InfiniteWalk_False()
        {
            Assert.AreEqual(false, TenMinuteWalkCs.isValidWalk(new char[] { 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n' }));
        }

        [TestMethod]
        public void TenMinuteWalkCs_TooShortWalk_False()
        {
            Random r = new Random(DateTime.Now.Millisecond);
            char[] nsew = new char[4] { 'n', 's', 'e', 'w' };

            for (int i = 1; i < 10; i++)
            {
                char[] walk = new char[i];
                for (int j = 0; j < i; j++)
                {
                    walk[j] = nsew[r.Next(4)];
                }

                Assert.IsFalse(TenMinuteWalkCs.isValidWalk(walk), new String(walk));
            }
        }

        [TestMethod]
        public void TenMinuteWalkCs_SemiRandomWalk_True()
        {
            for (int n = 0; n < 4; n++)
            {
                var walk = Enumerable.Repeat('s', n)
                    .Concat(Enumerable.Repeat('n', n))
                    .Concat(Enumerable.Repeat('w', 5 - n))
                    .Concat(Enumerable.Repeat('e', 5 - n))
                    .ToArray();

                Assert.IsTrue(TenMinuteWalkCs.isValidWalk(walk), new String(walk));
            }
        }
    }
}
