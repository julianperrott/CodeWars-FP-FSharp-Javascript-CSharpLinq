namespace Tests.MultiplyBy
{
    using System.Collections.Generic;
    using System.Linq;
    using CSharp.Codewars;
    using FSharp.CodeWars;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class MultiplyByFsTests
    {
        [TestMethod]
        public void MultiplyByFs_4Items()
        {
            var expected = new List<int> { 6, 18, 54, 162 };
            var actual = MultiplyByFs.multiplyBy(2, 3, 4).ToList();
            CollectionAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void MultiplyByFs_6Items()
        {
            var expected = new List<int> { 8, 32, 128, 512, 2048, 8192 };
            var actual = MultiplyByFs.multiplyBy(2, 4, 6).ToList();
            CollectionAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void MultiplyByV2Fs_6Items()
        {
            var expected = new List<int> { 8, 32, 128, 512, 2048, 8192 };
            var actual = MultiplyByFs.multiplyByV2(2, 4, 6).ToList();
            CollectionAssert.AreEqual(expected, actual);
        }
    }

    [TestClass]
    public class MultiplyByCsTests
    {
        [TestMethod]
        public void MultiplyByCs_4Items()
        {
            var expected = new List<int> { 6, 18, 54, 162 };
            var actual = MultiplyByCs.MultiplyBy(2, 3, 4).ToList();
            CollectionAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void MultiplyByCs_6Items()
        {
            var expected = new List<int> { 8, 32, 128, 512, 2048, 8192 };
            var actual = MultiplyByCs.MultiplyBy(2, 4, 6).ToList();
            CollectionAssert.AreEqual(expected, actual);
        }
    }
}