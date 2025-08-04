---
title: The HTTP Hydration Parameter Pattern
description: Efficiently returning extra data in APIs using hydration parameters
date: 2020-08-26T05:00:00.000-05:00
seo:
  title: "HTTP Hydration Parameters - API Design Pattern"
  description: "A pattern you can use to for your APIs. Learn how to efficiently return extra data in APIs using hydration parameters for better performance."
  keywords: ["api", "http", "csharp", "dotnet", "web api", "performance", "design patterns"]
  author: "Alex Lanthier"
  image: "/hydrate-parameter.jpg"
  url: "/hydrate-parameter"
---

The HTTP hydration parameter pattern is used for when you want "extra" data on one of your objects, but don't always need that data. You may have an API that returns an InventoryItem that is tied with its related Suppliers. You could configure your API method to optionally return that Suppliers with the InventoryItem.

```csharp
[HttpGet("{id}")]
[ProducesResponseType(typeof(Employer), StatusCodes.Status200OK)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
public async Task<IActionResult> GetEmployer([FromRoute]int id)
{
    var employer = await DataAccessor.Employers.GetAsync(id);
    employer.Employees = await DataAccessor.Employees.GetChildrenAsync(employer.Id);
    
    return Ok(employer);
}
```

This is a classic `GET` request to get an employer. Notice how we are also populating the returned `Employer` with its children `Employee`s. Now, consider this next example.

```csharp
[HttpGet("{id}")]
[ProducesResponseType(typeof(Employer), StatusCodes.Status200OK)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
public async Task<IActionResult> GetEmployer([FromRoute]int id, [FromQuery]bool hydrate = false)
{
    var employer = await DataAccessor.Employers.GetAsync(id);
    if (hydrate)
    {
        employer.Employees = await DataAccessor.Employees.GetChildrenAsync(employer.Id);
    }

    return Ok(employer);
}
```

Now, we are only populating employees if the consumer passes in a `hydrate` parameter equal to true. This allows us to reduce the complexity of the data returned and sometimes speed up your API if these relationships contain large amounts of data.

## Benefits of this Pattern

The benefit of this pattern is efficiency. An `Employer` with large amounts of children `Employee` objects would take longer to get if you needed to populate them every time.

If you aren't convinced, consider a cron job that needs thousands of `Employer` objects. If that job doesn't need `Employee`s, the job is going to take longer to run. All because the first example assumed the consumer always wanted a fully hydrated object!

## Defining "extra" data

In my opinion, the data that you should omit if `hydrate=false` is any data that you do NOT need for an `UPDATE` operation. At a bare minimum we need to provide our API consumers with sufficient data on a `GET` operation to support an `UPDATE`, otherwise they can accidentally override data will null values. Let's talk about how to separate these concerns using the info pattern.

**EmployerInfo.cs**

```csharp
namespace LanthierCodes.Employer.Models
{
    public class EmployerInfo
    {
        public string Name { get; set; }

        public string Contact { get; set; }
    }
}
```

The `EmployerInfo` class contains all **updatable** properties. These are properties that the consumer can manipulate on add or update.

**Employer.cs**

```csharp
namespace LanthierCodes.Employer.Models
{
    using System.Collections.Generic;

    public class Employer : EmployerInfo
    {
        public int Id { get; set; }

        public List<Employee> Employees { get; set; } // Our "extra" data we don't always need to return
    }
}
```

The `Employer` class contains all **not updatable** properties. Properties that are eventually translated to primary keys belong here. Some entity relationships may also live in here.

Since an employer in our database has thousands of employees `Employees`, we do not want populate them for every `GET`. Instead, we opt to populate them only when the client wishes to. Thus, we can define the `Employees` property as "extra data" in terms of our pattern.

## Complex Practical examples

I have used this pattern numerous times as a professional. Let's go through (near exact) examples of some work I have done in the past using hydrate params.

**Multiple data fields**

In a real life scenario, it is likely you will need to do this not just for one data fields but for several. Here is an example of something similar to what I coded for a content management system in the past.

```csharp
[HttpGet("{id}")]
[ProducesResponseType(typeof(ContentItem), StatusCodes.Status200OK)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
public async Task<IActionResult> GetContent(
    [FromRoute]int id, [FromQuery]bool hydrate = false)
{
    var content = await DataAccessor.Content.GetAsync(id);

    if (content == null)
    {
        return NotFound($"Content {id} not found.");
    }

    //We need these for an UPDATE operation, so populate them no matter what
    content.TagIds = (await DataAccessor.ContentTags.GetAsync(content.Id))?.Select(ct => ct.TagId); 
    content.Logo = (await DataAccessor.ContentLogos.GetChildrenAsync(content.Id))?.FirstOrDefault();

    //Anything we don't need for UPDATE can go here
    if (hydrate)
    {
        content.Files = await DataAccessor.ContentFiles.GetChildrenAsync(content.Id);
        content.Leads = await DataAccessor.Leads.GetChildrenAsync(content.Id);
        content.Tools = await DataAccessor.Tools.GetChildrenAsync(content.Id);

        //Populate even more data! Children of children of our base entity
        foreach(var file in content.Files)
        {
            file.Previews = await DataAccessor.FilePreviews.GetChildrenAsync(file.Id);
        }
    }

    return Ok(content);
}
```

`TagIds` and `Logo` are both required properties for an update, so we include those regardless of the value of `hydrate`.

`Files`, `Leads` and `Tools` are all not required for an update but are important fields on a piece.

On each `File` we hydrate even more data. We grab the children `Preview` entities for each file. This is a great example of how hydrate can really make your API more efficient.

## Final thoughts

Hydration parameters are something I hope to see more of. All too many times I see APIs bringing back large amounts of data that I never use as a consumer. I wouldn't be opposed to using two or three hydration parameters for specific sectors of data either! You could have a parameter in my previous example named `hydrateTools` and another named `hydrateFiles`. The most important part is we are being efficient.

Next time you are returning objects with children entities in your APIs, consider using this pattern. 