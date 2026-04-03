# BookCraft AI Instructions
## How to Generate a Perfect Book for BookCraft

> **Upload this file to any AI assistant** (Claude, ChatGPT, Gemini, etc.) and then say:
> *"Using the BookCraft format in the instructions, write me a complete book on [Your Topic]."*
> Then paste the AI's output into the BookCraft editor and hit Export!

---

## 🤖 FOR THE AI: READ THIS FIRST

You are generating Markdown content for **BookCraft** — a browser-based book publishing tool. BookCraft extends standard Markdown with special `:::tag:::` block syntax for rich book formatting. Your output will be pasted directly into the BookCraft editor to produce a beautifully formatted PDF/EPUB book.

**Your job:** Generate complete, well-structured book content using the tags documented below. Always produce a full book — cover page, table of contents, all chapters — in one response unless the user asks for individual sections.

---

## 📐 REQUIRED BOOK STRUCTURE

Every book MUST follow this exact structure in order:

```
1. Cover Page        ← :::cover ... :::
2. Page Break        ← :::pagebreak:::
3. Table of Contents ← :::toc:::
4. Page Break        ← :::pagebreak:::
5. Chapter 1         ← :::chapter{1} ... :::  then content
6. Page Break        ← :::pagebreak:::
7. Chapter 2         ← :::chapter{2} ... :::  then content
8. Page Break        ← :::pagebreak:::
... (repeat for all chapters)
```

---

## 🏷️ ALL BOOKCRAFT TAGS — COMPLETE REFERENCE

---

### 1. COVER PAGE

Creates a full, styled book cover with title, subtitle, and author name.

**Syntax:**
```
:::cover
Book Title Here
Subtitle or Tagline Goes Here
Author: First Last
:::
```

**Rules:**
- Line 1 = Book title (required)
- Line 2 = Subtitle (optional, but recommended)
- Any line starting with `Author:` = author name
- No Markdown formatting inside the cover block

**Example:**
```
:::cover
Core Java Deep Mastery
A Complete Reference for Senior Engineers
Author: Jane Doe
:::
```

---

### 2. TABLE OF CONTENTS

Auto-generates a TOC from all headings in your document. Just place the tag — BookCraft fills it in automatically.

**Syntax:**
```
:::toc:::
```

**Rules:**
- Place this after the cover page and a page break
- Only one TOC per book
- Do NOT manually write TOC entries — the app generates them

**Example:**
```
:::pagebreak:::

:::toc:::

:::pagebreak:::
```

---

### 3. CHAPTER BREAK

Renders a decorative chapter title page with chapter number and title.

**Syntax:**
```
:::chapter{N}
Chapter Title Here
:::
```

- Replace `N` with the chapter number (1, 2, 3…)
- The title goes on the next line
- After the `:::`, continue with `## Chapter N — Title` as the first heading

**Example:**
```
:::chapter{1}
Foundations of the Type System
:::

## Chapter 1 — Data Types & Variables

Regular chapter content begins here...
```

---

### 4. PAGE BREAK

Forces content to start on a new page. Use between cover/TOC and each chapter.

**Syntax:**
```
:::pagebreak:::
```

**Usage pattern:**
```
:::cover
...
:::

:::pagebreak:::

:::toc:::

:::pagebreak:::

:::chapter{1}
...
:::

Content of chapter 1...

:::pagebreak:::

:::chapter{2}
...
:::
```

---

### 5. CALLOUT BOXES

Styled alert/callout boxes for important information. Six types available:

#### Info Box (blue)
```
:::info
**Info:** Your informational message here.
:::
```

#### Warning Box (amber)
```
:::warning
**Warning:** Something the reader should be careful about.
:::
```

#### Danger Box (red)
```
:::danger
**Danger:** Critical issue or breaking change.
:::
```

#### Tip Box (green)
```
:::tip
**Tip:** A helpful tip or best practice for the reader.
:::
```

#### Note Box (purple)
```
:::note
**Note:** An additional thought worth highlighting.
:::
```

#### Sidebar Box (floats right)
```
:::sidebar
**Quick Reference**
Key point 1
Key point 2
Key point 3
:::
```

**Rules:**
- You can use Markdown inside callout boxes (bold, italic, code, lists)
- Use callouts sparingly — 2–5 per chapter is ideal
- `:::sidebar` floats to the right and is good for reference panels

---

### 6. TWO-COLUMN LAYOUT

Splits content into two side-by-side columns. Great for comparisons.

**Syntax:**
```
:::two-col
Left column content here. Write a paragraph or two.

Right column content here. Write a paragraph or two.
:::
```

**Rules:**
- Separate the two columns with a blank line
- Keep both columns roughly the same length
- Works best for comparison text, not for code blocks or tables

**Example:**
```
:::two-col
**ArrayList** excels at random access by index — O(1). It uses a contiguous array internally giving excellent CPU cache locality.

**LinkedList** excels at insertion and deletion at both ends — O(1). Use it as a Deque rather than a List for best results.
:::
```

---

### 7. FIGURE WITH CAPTION

Wraps an image in a figure element with a caption below it.

**Syntax:**
```
:::figure{Figure 1.1: Description of what this figure shows}
![Alt text description](image-url-here)
:::
```

**Rules:**
- The text inside `{}` becomes the caption
- The image goes on the next line using standard Markdown image syntax
- Use descriptive alt text for accessibility

**Example:**
```
:::figure{Figure 2.1: HashMap bucket structure with treeification}
![HashMap internal structure diagram](https://example.com/hashmap.png)
:::
```

---

## ✏️ INLINE FORMATTING

These work anywhere in your text:

### Highlight Text
```
This is ==highlighted text== in the book.
```
Renders as a yellow/colored highlight mark.

### Keyboard Shortcut Badge
```
Press [[kbd: Ctrl+S]] to save your work.
Press [[kbd: Ctrl+Shift+T]] to run tests.
```
Renders as styled keyboard key badges.

---

## 📝 STANDARD MARKDOWN (fully supported)

All standard Markdown works inside BookCraft:

### Headings
```markdown
# H1 — Chapter-level title
## H2 — Section heading
### H3 — Sub-section
#### H4 — Minor heading
```

### Text Formatting
```markdown
**bold text**
*italic text*
~~strikethrough~~
`inline code`
```

### Code Blocks (with syntax highlighting)
Use language identifiers for syntax highlighting:
```
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```
```

Supported languages: `java`, `python`, `javascript`, `typescript`, `go`, `rust`, `sql`, `bash`, `xml`, `json`, `yaml`, `css`, `html`, and more.

### Blockquote
```markdown
> "This is an inspiring quote." — Famous Person
```

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value A  | Value B  | Value C  |
| Value D  | Value E  | Value F  |
```

### Lists
```markdown
- Unordered item one
- Unordered item two
  - Nested item

1. First ordered item
2. Second ordered item
3. Third ordered item
```

### Horizontal Rule
```markdown
---
```

### Links
```markdown
[Link text](https://example.com)
```

---

## 📚 COMPLETE BOOK EXAMPLE

Here is a minimal but complete example of a 2-chapter book on Core Java:

```markdown
:::cover
Core Java Deep Mastery
A Complete Reference for Modern Java Developers
Author: Jane Doe
:::

:::pagebreak:::

:::toc:::

:::pagebreak:::

:::chapter{1}
Foundations of the Type System
:::

## Chapter 1 — Data Types & Auto-Boxing

Java is a **statically typed** language. Every variable has a compile-time type.

### 1.1 Primitive Types

| Type    | Wrapper | Bits | Default |
|---------|---------|------|---------|
| `byte`  | `Byte`  | 8    | 0       |
| `int`   | `Integer`| 32  | 0       |
| `long`  | `Long`  | 64   | 0L      |
| `double`| `Double`| 64   | 0.0d    |

### 1.2 The Integer Cache Trap

:::warning
**Never use `==` to compare `Integer` objects.** Values outside -128 to 127 always create new heap objects. Always use `.equals()`.
:::

```java
Integer a = 127; Integer b = 127;
System.out.println(a == b);      // true  (cached)

Integer c = 200; Integer d = 200;
System.out.println(c == d);      // false (different objects!)
System.out.println(c.equals(d)); // true  — correct
```

:::tip
**Tip:** Prefer `Objects.equals(a, b)` over `a.equals(b)` — it's null-safe and avoids NullPointerException.
:::

:::pagebreak:::

:::chapter{2}
Collections Framework
:::

## Chapter 2 — Collections Deep Dive

### 2.1 Choosing the Right Collection

:::sidebar
**Decision Cheat Sheet**
Fast access → ArrayList
Stack/Queue → ArrayDeque
Unique items → HashSet
Sorted items → TreeSet
Thread-safe → ConcurrentHashMap
:::

1. **Fast random access** → `ArrayList`
2. **Stack or Queue** → `ArrayDeque`
3. **Unique elements** → `HashSet`
4. **Sorted unique** → `TreeSet`
5. **Thread-safe map** → `ConcurrentHashMap`

### 2.2 HashMap vs LinkedHashMap vs TreeMap

:::two-col
**HashMap** offers O(1) average get/put but makes no guarantees about iteration order. Best when order doesn't matter and performance is critical.

**LinkedHashMap** maintains insertion order with a slight overhead. Use it when you need predictable iteration over a map's entries.
:::

:::danger
**ConcurrentModificationException** — Never structurally modify a `HashMap` or `ArrayList` while iterating with a for-each loop. Use an `Iterator` with `iterator.remove()` instead.
:::
```

---

## 🎯 AI GENERATION GUIDELINES

When generating a full book, follow these rules:

1. **Always start with `:::cover`** — include a compelling title, subtitle, and author name.

2. **Always include `:::toc:::`** after the cover and a page break. Never write TOC entries manually.

3. **Use `:::chapter{N}` for every chapter** — increment N for each chapter.

4. **Use `:::pagebreak:::` between every major section** — between cover/TOC, and between chapters.

5. **Use headings hierarchically:**
   - `##` for chapter sections (e.g., `## Chapter 1 — Title`)
   - `###` for sub-sections
   - `####` for minor headings

6. **Use callout boxes contextually:**
   - `:::warning` for common mistakes and gotchas
   - `:::danger` for critical errors or breaking changes
   - `:::info` for background context
   - `:::tip` for best practices
   - `:::note` for additional thoughts
   - `:::sidebar` for quick-reference panels

7. **Use code blocks for all code** — always specify the language.

8. **Use tables** for comparisons, API references, or feature matrices.

9. **Use `:::two-col`** for side-by-side comparisons.

10. **Use `==highlight==`** sparingly for key terms on first introduction.

11. **Aim for 3–8 chapters** for a typical technical book.

12. **Each chapter should have:** an introduction paragraph, 3–6 sections with `###` headings, at least one code block (for technical books), at least one callout box, and a closing summary or transition.

---

## ⚠️ COMMON MISTAKES TO AVOID

| Wrong | Correct |
|-------|---------|
| Writing TOC entries manually | Use `:::toc:::` and let the app generate it |
| `:::Chapter{1}` (capital C) | `:::chapter{1}` (lowercase) |
| Forgetting `:::` to close blocks | Every `:::tag` block needs a closing `:::` |
| Skipping page breaks between chapters | Always add `:::pagebreak:::` before each chapter |
| Nesting `:::blocks:::` inside each other | Do not nest special blocks |
| Using `# H1` inside chapter content | Use `##` and below inside chapters |

---

## 📋 QUICK TAG CHEAT SHEET

```
:::cover
Title
Subtitle
Author: Name
:::

:::pagebreak:::

:::toc:::

:::pagebreak:::

:::chapter{1}
Chapter Title
:::

## Section Heading

### Subsection

:::info
Info message
:::

:::warning
Warning message
:::

:::danger
Critical message
:::

:::tip
Helpful tip
:::

:::note
Side note
:::

:::sidebar
Sidebar content
:::

:::two-col
Left content

Right content
:::

:::figure{Figure 1.1: Caption}
![alt](image-url)
:::

:::pagebreak:::

==highlighted term==

[[kbd: Ctrl+S]]
```

---

*BookCraft — Markdown Book Studio | Generate → Paste → Export*
