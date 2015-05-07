describe("Triplets", function () {



    it("", function () {

        triplets1 = [
          ['t', 'u', 'p'],
          ['w', 'h', 'i'],
          ['t', 's', 'u'],
          ['a', 't', 's'],
          ['h', 'a', 'p'],
          ['t', 'i', 's'],
          ['w', 'h', 's']
        ]

        expect(recoverSecret(triplets1)).toEqual("whatisup");
    });
});
