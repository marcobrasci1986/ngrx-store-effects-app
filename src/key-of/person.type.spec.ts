describe("Keyof", () => {

  it("should use keyof in real world example", function () {
    const person = {
      name: 'Todd',
      age: 27
    };

    type Person = typeof person;
    type PersonKeys = keyof Person;
    type PersonTypes = Person[PersonKeys]

    const personName: string = getProperty(person, 'name');
    const personAge: number = getProperty(person, 'age');

    expect(personName).toBe("Todd");
    expect(personAge).toBe(27);


  });

  /**
   * key must be name or age
   */
  function getProperty<T, K extends keyof T>(object: T, key: K) {
    return object[key];
  }

});


