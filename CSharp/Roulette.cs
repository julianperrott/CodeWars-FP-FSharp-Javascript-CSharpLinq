using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharp
{
    public class Roulette
    {
        double[] c;
        double total = 0;
        Random random = new Random();

        public Roulette(double[] n)
        {
            c = new double[n.Length + 1];
            c[0] = 0;

            // Create cumulative values for later:
            for (int i = 0; i < n.Length; i++)
            {
                c[i + 1] = c[i] + n[i];
                total += n[i];
            }
        }

        public int spin()
        {
            double r = random.NextDouble() * total;     // Create a random number between 0 and 1 and times by the total we calculated earlier.

            //// Binary search for efficiency. Objective is to find index of the number just above r:
            int a = 0;
            int b = c.Length - 1;
            while (b - a > 1)
            {
                int mid = (a + b) / 2;
                if (c[mid] > r) b = mid;
                else a = mid;
            }
            return a;
        }
    }
}
