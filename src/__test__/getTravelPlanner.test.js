import { getTravelPlanner } from "../client/js/app"

describe("Testing the value returned from API", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getTravelPlanner() function", () => {
        expect(getTravelPlanner).toBeDefined();
    }) 
});