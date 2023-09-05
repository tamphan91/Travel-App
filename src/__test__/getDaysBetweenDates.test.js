import { getDaysBetweenDates } from "../server/utils"

describe("Testing the value returned from getDaysBetweenDates function", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getDaysBetweenDates() function", () => {
        expect(getDaysBetweenDates('09-09-2023', '09-11-2023')).toBe(2);
    }) 
});