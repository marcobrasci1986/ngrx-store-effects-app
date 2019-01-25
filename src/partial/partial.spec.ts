fdescribe("SpreadOperator", () => {

  interface Person {
    name: string;
    age: number;
  }

  it("example of partial type", function () {
    const person: Person = {
      name: "Todd",
      age: 27
    };

    let updatedPerson = updatePersonTest(person, {name: "ABC"});

    expect(updatedPerson.name).toBe("ABC")
  });

  function updatePersonTest(person: Person, prop: Partial<Person>) {
    return {
      ...person,
      ...prop
    };

  }

});
