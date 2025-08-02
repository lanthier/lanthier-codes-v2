---
title: C# Info Pattern
description: Understanding and implementing the info pattern in C#
seo:
  title: "C# Info Pattern - Clean Architecture Design Pattern"
  description: "Learn the C# info pattern for clean architecture and better code organization. Understand when and how to implement this design pattern in your C# applications."
  keywords: ["csharp", "design patterns", "architecture", "dotnet", "programming", "clean code"]
  author: "Alex Lanthier"
  image: "/csharp-info-pattern.jpg"
  url: "/csharp-info-pattern"
---

If you are passing your Web API controller create methods objects that have an ID on them, you should rethink your strategy.

Have you ever dealt with a C# model in a class project or at work and didn't fully populate the object's properties? Perhaps you are creating a new instance of an object that has extra properties on it for relational purposes. Or your object has an Id integer on it that represents its primary key in a database (very common). Take this class for example:

```csharp
namespace LanthierCodes
{
    public class Pet
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }
    }
}
```

Our **Pet** object has three properties: **Id**, **Name** and **Age**. The **Name** and **Age** property are both useful for creating a Pet, however the Id property is useless. How would we utilize this class as it stands for creation?

```csharp
var pet = new Pet()
{
    Id = 123, //Why?
    Name = "Charlie",
    Age = 4
};

var id = PetService.PostPetAsync(pet);
```

Of course I did not actually need to put anything on the object at all, but it exists as a useless property if our API is RESTful. Furthermore, in my opinion, it implies that giving the object an Id will actually have some meaningful affect in the API when it doesn't/shouldn't. How do we remedy this? Take a look:

```csharp
namespace LanthierCodes
{
    public class Pet : PetInformation
    {
        public int Id { get; set; }
    }

    public class PetInformation
    {
        public string Name { get; set; }

        public int Age { get; set; }
    }
}
```

Our **PetInformation** class will now hold any information we want to use for creates and updates! When we want to GET, we can return the **Pet** class with all of the information still on it, including its Id! Let's take a look at an example Web API Interface that utilizes this pattern and also show an example of how we might utilize it.

**Interface:**

```csharp
namespace LanthierCodes
{
    public interface IPetService
    {
        Task<Pet> GetPetAsync(int id);

        Task<int> PostPetAsync(PetInformation pet);

        Task PutPetAsync(int id, PetInformation pet);

        Task DeletePetAsync(int id);
    }
}
```

**Example usage:**

```csharp
var petInfo = new PetInformation()
{
    Name = "Charlie",
    Age = 4
};
var id = await PetService.PostPetAsync(petInfo);

var pet = await PetService.GetPetAsync(id);

pet.Age++;

await PetService.PutPetAsync(id, pet);
```

Notice how we no longer have any properties exposed on our object we use for the POST operation. It is best practice to follow a design pattern along these lines. We use **Pet** for all operations that from *from* the API *to* the consumer (GET). Then we use **PetInformation** for when we go *from* the consumer *to* the API (POST, PUT).

![Info Object Example](/infoobject.png) 