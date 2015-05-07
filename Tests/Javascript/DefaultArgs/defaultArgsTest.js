describe("default args", function () {

    function add(a, b) { return a + b; };

    describe("{ b: 9 }", function () {

        var add_ = defaultArguments(add, { b: 9 });

        it("add_(10)", function () {
            expect(add_(10)).toEqual(19);
        });

        it("add_(10,7)", function () {
            expect(add_(10, 7)).toEqual(17);
        });

        it("add_()", function () {
           expect(add_()).toEqual(NaN);
        });
    }),

     describe("{ b: 3, a: 2 }", function () {
         var add_ = defaultArguments(add, { b: 9 });
         var add_ = defaultArguments(add_, { b: 3, a: 2 });

         it("add_(10)", function () {
             expect(add_(10)).toEqual(13);
         });

         it("add_()", function () {
             expect(add_()).toEqual(5);
         });
     }),

     describe("{ c: 3 }", function () {
         var add_ = defaultArguments(add, { b: 9 });
         var add_ = defaultArguments(add_, { b: 3, a: 2 });
         var add_ = defaultArguments(add_, { c: 3 });

         it("add_(10)", function () {
             expect(add_(10)).toEqual(13);
         });

         it("add_(10,10)", function () {
             expect(add_(10, 10)).toEqual(20);
         });
     });

});