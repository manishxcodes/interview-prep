export function testFn () {
    // console.log("immutablity");

    //let str = "Hello redux";
    /* 
    this will give error as string are immutable 
    immutablity only applicable for primitive datatype in js
    */
    //str[0] = 'd';   

    /* 
    this is allowed because it doesnot change original string it creates a new string and now the varible 'str' points to "bye redux"
    */
    // str = "bye redux"    

    // console.log(str);

// --------------------------------------------

    /* objects are mutable */
    /* 
    in case of const object
    once obj points to a specific object, you cannot reassign it to 
    a new objejct. but the object's content are still mutable

    in case of let and var object you can reassing the varible to point
    to a new object and mutate object's property as well 
    */

    // const obj: any = {};
    // obj.x = "x";
    // obj.y = "y";

    // console.log(obj);   // (A) logs obj including 't'
    // console.log(obj.t); // (B) logs undefined
    // show(obj);
    // console.log(obj.t)  // (C) logs 'test'

    /**
      A. At this moment, obj has only x and y.
        The console prints a reference to the object, not a frozen snapshot.
        In DevTools, when you expand the logged object later, it may show the updated state (including t after show(obj) runs).
        That’s why you see t in the first log, even though it wasn’t there yet when the log was executed.

      B. this evaluates the property immediately
         since 't' doesn't exist yet, it prints undefined.
         unlike console.log(obj), this is a primitive value, not a 
         reference - so it won't change later
     */

    // ------------------------------------------------

    const obj = {
        _t: "tea",
        get t () {
            console.log("trying to acces t");
            return this._t
        },
        set t(newValue: any) {
            console.log("trying to set new value to t:");
            console.log(`old value = ${this.t}, new value = ${newValue}`);
            this._t = newValue;
        }
    }

    console.log(obj);

    show(obj);
    /**
     * after ths call logs ---
     
     * trying to set new value to t:
     * trying to access t
     * old value = tea, new value = test
     */
}

function show(obj: any) {
    obj.t = "test";
}