# Naming and Organisation Conventions

This document outlines the naming and organisation conventions used in this project to ensure consistency and clarity for SFS modders, whether they are making a code mod, texture pack, or part pack.

# Configuration

The target framework should be .NET Framework 4.8.x. Hence, your code will be in the latest C# version supported, C# 7.3.

# Naming and Entry Point

Let's say you have an idea for a mod and want to call it "Super Crazy Engines 2.0." This is the concept name.

## Repository/Filesystem (Layer 1)

If using version control (please do), the repository name must be an alphabetical string and use kebab-case, a dash (-) in place of spaces, e.g. "Super-Crazy-Engines". Both uppercase and lowercase names are allowed.

## `.csproj`, `.dll` and Assembly (Layer 2)

Your `.csproj` name should be the alphabetical version of your DisplayName with no spaces, e.g. `SuperCrazyEngines.csproj`
The built assembly name (`.dll` file) should be the same as the `.csproj` name, e.g. `SuperCrazyEngines.dll`.

Your assembly title in `AssemblyInfo.cs` should also be the same as your `.csproj` name.

The default namespace where your mod entry point class lives should be the .csproj name as well, `SuperCrazyEngines`.

## Entry Point (Layer 3)

The entry point of a mod should always be a class with the signature `<ModName>.Main`, where `ModName ` is the default namespace of your mod, which would also be your `.csproj`'s name, e.g. `SuperCrazyEngines.Main`. `Main` is a class inheriting from the abstract class `ModLoader.Mod`, and is needed for the game to recognise the entry point of a mod.

`Main` should be a non-static singleton class, to prevent unwanted multiple instances of a mod, but also to enable access of fields such as `ModNameID` from outside of the class. `Main` is and should only be instantiated by `ModLoader.Loader` using the parameter-less constructor when it is loading all of the DLL mods.

```cs
using ModLoader;

namespace MyMod
{
	public class Main : Mod
	{
		public static Main Instance { get; private set; }

		public Main()
		{
			Instance = this;
		}

		// ...
	}
}
```

`ModLoader.Mod` has abstract members that will be covered in the next layer, but they are omitted in this example to highlight the specific singleton pattern implementation that works with the game's mod loader.

## `DisplayName` and `ModNameID` (Layer 4)

`DisplayName` and `ModNameID` are two identifying string fields that are required to be overridden by mods when inheriting from `ModLoader.Mod`.

`DisplayName` is what players see in the in-game mod menu. `ModNameID` is a unique string identifier used by `ModLoader.Loader`, used to differentiate mods programmatically by name.

`DisplayName` should be your concept name with no restrictions. `ModNameID` should be the alphabetical lowercase version of your concept name in kebab-case, e.g. `"super-crazy-engines"`.

## Harmony Patching

Often, mods will need to modify in-game functionality via method and accessor prefixing and postfixing through a library called Harmony. This is called patching.

The recommended way of adding patches cleanly is to first:

1. Make a folder for to contain all of your patches. It should preferably be in the root source code folder but anywhere that can be easily found is also acceptable. It should be named `Patches`.
2. Create patches in a nested namespace under your default namespace, e.g. `SuperCrazyEngines.Patches`. These should be organised by a static class for each method or property accessor you are patching, e.g. The static classes should be in their own files, and these files should be named after the method they are patching.

```cs
namespace PartMenuAPI.Patches
{
    [HarmonyPatch(typeof (Part), "DrawPartStats")]
    public static class DrawPartStats
    {
        [HarmonyPostfix]
        public static void Postfix(Part part, Part[] allParts, StatsMenu drawer, PartDrawSettings settings)
        {
           // ...
        }
    }
}
```

3. In your mods `Early_Load`, instantiate a Harmony patcher via `new Harmony(ModNameID)`.
   1. This harmony patcher should be an internal instance variable in your entry point class, called `patcher`. Omit it entirely if you are not making any patches.
4. If you are creating many patches on many different classes, you should create a folder for each class you are patching, with each file patching a specific method of that class being in it.

## Logging

When logging from your mod, you should always prefix your log messages with your `ModNameID` in square brackets, e.g. `[supercrazyengines] This is a log message from my mod.` This helps users and developers identify which mod a log message is coming from when debugging issues.

An SFS mod called UniLog gives you a simple API to log messages with your mod's name automatically prefixed. It is recommended to use UniLog for logging in your mod, and hence it should be added as a dependency in your mod's `Dependencies` property.

You can find more information about UniLog [here](https://github.com/kojamori/UniLog).

However, examples will not use UniLog for simplicity.

## Boilerplate (Harmony)

Here is a boilerplate template to be used when quickly making a mod's entry point.
Replace the placeholder values with your own mod's information.

```csharp
using HarmonyLib;
using ModLoader;
using System.Collections.Generic;

namespace MyMod
{
public class Main : Mod
    {
    public static Main Instance { get; private set; }
    public Main()
    {
        Instance = this;
    }

    public override string ModNameID => "mymod";
    public override string DisplayName => "My Mod";
    public override string Author => "Your Name Here";
    public override string Description => "Your mod description here.";
    public override string ModVersion => "1.0.0";
    public override string MinimumGameVersionNecessary => "1.6.00.0.";
    public override Dictionary<string, string> Dependencies => new Dictionary<string, string>();

    public override void Early_Load()
    {
    patcher.LoadAll();
    }


    public override void Load()
    {
    // ...
    }

    internal readonly Harmony patcher = new Harmony(ModNameID);
    }
}
```

## Boilerplate (No Harmony)

```csharp
using ModLoader;
using System.Collections.Generic;

namespace MyMod
{
    public class Main : Mod
    {
        public static Main Instance { get; private set; }
        public Main()
        {
            Instance = this;
        }

        public override string ModNameID => "mymod";
        public override string DisplayName => "My Mod";
        public override string Author => "Your Name Here";
        public override string Description => "Your mod description here.";
        public override string ModVersion => "1.0.0";
        public override string MinimumGameVersionNecessary => "1.6.00.0.";
        public override Dictionary<string, string> Dependencies => new Dictionary<string, string>();

        public override void Early_Load()
        {
            // ...
        }

        public override void Load()
        {
            // ...
        }
    }
}
```
