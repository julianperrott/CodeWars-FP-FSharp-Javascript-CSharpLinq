using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.FSharp.Core;
using Microsoft.FSharp.Collections;

namespace FSharpTest
{
    [TestClass]
    public class MultiplyBy
    {
        [TestMethod]
        public void MultiplyBy_4Items()
        {
            var expected = new List<int> { 6, 18, 54, 162 };
            var actual = FSharp.CodeWars.multiplyBy(2, 3, 4).ToList();
            CollectionAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void MultiplyBy_6Items()
        {
            var expected = new List<int> { 8, 32, 128, 512, 2048, 8192 };
            var actual = FSharp.CodeWars.multiplyBy(2, 4, 6).ToList();
            CollectionAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void MultiplyByV2_6Items()
        {
            var expected = new List<int> { 8, 32, 128, 512, 2048, 8192 };
            var actual = FSharp.CodeWars.multiplyByV2(2, 4, 6).ToList();
            CollectionAssert.AreEqual(expected, actual);
        }
    }
}
