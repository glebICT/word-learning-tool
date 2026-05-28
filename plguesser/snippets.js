// Snippet style guide:
//   - language: canonical display name shown on answer buttons
//   - category: language family (see LANGUAGE_CATEGORIES in script.js)
//   - code: raw source as a string; preserve original indentation
//   - tell: one short, beginner-friendly sentence naming the visual giveaway
//   - keep code <= 15 lines and <= 80 chars per line
//   - aim for snippets that exhibit at least one syntactic feature unique to
//     the language (keywords, sigils, layout, stdlib calls)

const SNIPPETS = [
  {
    language: "Python",
    category: "Mainstream / Web",
    code: `def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))`,
    tell: "The 'def' keyword and significant indentation (no braces, no semicolons) are giveaways for Python.",
  },
  {
    language: "Python",
    category: "Mainstream / Web",
    code: `squares = [x * x for x in range(10) if x % 2 == 0]
print(squares)`,
    tell: "List comprehensions like [expr for x in iterable if cond] are a Python signature.",
  },

  {
    language: "JavaScript",
    category: "Mainstream / Web",
    code: `const greet = (name) => {
    console.log(\`Hello, \${name}!\`);
};

greet("world");`,
    tell: "'const' declarations, arrow functions (=>), and console.log are classic JavaScript.",
  },
  {
    language: "JavaScript",
    category: "Mainstream / Web",
    code: `fetch("/api/users")
    .then((res) => res.json())
    .then((users) => console.log(users));`,
    tell: "Promise chains with .then() and the global fetch() function are JavaScript-specific.",
  },

  {
    language: "Java",
    category: "JVM",
    code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`,
    tell: "The exact phrase 'public static void main(String[] args)' and System.out.println only appear in Java.",
  },
  {
    language: "Java",
    category: "JVM",
    code: `List<Integer> nums = new ArrayList<>();
for (int i = 0; i < 5; i++) {
    nums.add(i * i);
}
System.out.println(nums);`,
    tell: "Generic types like List<Integer> with 'new ArrayList<>()' and semicolons everywhere point to Java.",
  },

  {
    language: "C",
    category: "Systems",
    code: `#include <stdio.h>

int main(void) {
    printf("Hello, world!\\n");
    return 0;
}`,
    tell: "'#include <stdio.h>', 'int main(void)', and printf with an explicit \\n are C hallmarks.",
  },
  {
    language: "C",
    category: "Systems",
    code: `struct Point {
    int x;
    int y;
};

struct Point p = {3, 4};
printf("%d, %d\\n", p.x, p.y);`,
    tell: "Declaring a 'struct' and later using 'struct Name var' (not just 'Name var') is pure C.",
  },

  {
    language: "Ruby",
    category: "Mainstream / Web",
    code: `[1, 2, 3, 4, 5].each do |n|
  puts "n = #{n}"
end`,
    tell: "Blocks written as 'do |x| ... end' and 'puts' with #{...} interpolation are Ruby.",
  },
  {
    language: "Ruby",
    category: "Mainstream / Web",
    code: `class Dog
  attr_accessor :name

  def initialize(name)
    @name = name
  end
end`,
    tell: "'attr_accessor', 'def initialize', and @instance variables are unmistakably Ruby.",
  },

  {
    language: "Go",
    category: "Systems",
    code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}`,
    tell: "'package main', 'import \"fmt\"', and 'func main()' are Go's calling card.",
  },
  {
    language: "Go",
    category: "Systems",
    code: `nums := []int{1, 2, 3}
for i, n := range nums {
    fmt.Printf("%d: %d\\n", i, n)
}`,
    tell: "Short variable declaration ':=' and 'for ... := range ...' loops are Go.",
  },

  {
    language: "Bash",
    category: "Scripting",
    code: `#!/bin/bash
for file in *.txt; do
    echo "Found: $file"
done`,
    tell: "The shebang #!/bin/bash, $variables, and 'for ... in ...; do ... done' are Bash idioms.",
  },
  {
    language: "Bash",
    category: "Scripting",
    code: `if [ -f "$1" ]; then
    cat "$1"
else
    echo "No such file: $1" >&2
fi`,
    tell: "Test syntax 'if [ ... ]; then ... fi' and '$1' for arguments mark Bash scripts.",
  },

  {
    language: "SQL",
    category: "Logic / Query",
    code: `SELECT u.name, COUNT(o.id) AS orders
FROM users u
JOIN orders o ON o.user_id = u.id
GROUP BY u.name
ORDER BY orders DESC;`,
    tell: "Uppercase clauses like SELECT ... FROM ... JOIN ... GROUP BY are SQL.",
  },
  {
    language: "SQL",
    category: "Logic / Query",
    code: `CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE
);`,
    tell: "CREATE TABLE with column types like INTEGER/TEXT and PRIMARY KEY is SQL DDL.",
  },

  {
    language: "COBOL",
    category: "Historic / Legacy",
    code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       PROCEDURE DIVISION.
           DISPLAY "Hello, world!".
           STOP RUN.`,
    tell: "Fixed-column layout, all-caps DIVISIONs, and 'DISPLAY ... STOP RUN' are COBOL.",
  },
  {
    language: "COBOL",
    category: "Historic / Legacy",
    code: `       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-COUNT     PIC 9(4) VALUE 0.
       01 WS-NAME      PIC X(20) VALUE "WORLD".
       PROCEDURE DIVISION.
           ADD 1 TO WS-COUNT.
           DISPLAY "HELLO " WS-NAME.`,
    tell: "PIC clauses like 'PIC 9(4)' and 'WORKING-STORAGE SECTION' are pure COBOL.",
  },

  {
    language: "PL/I",
    category: "Historic / Legacy",
    code: `HELLO: PROCEDURE OPTIONS(MAIN);
   DECLARE NAME CHAR(20) VARYING;
   NAME = 'WORLD';
   PUT SKIP LIST('HELLO, ' || NAME);
END HELLO;`,
    tell: "'PROCEDURE OPTIONS(MAIN)', DECLARE, and 'PUT SKIP LIST' are PL/I.",
  },

  {
    language: "Eiffel",
    category: "Historic / Legacy",
    code: `class HELLO
create
    make
feature
    make
        do
            print ("Hello, world!%N")
        end
end`,
    tell: "'create / make' blocks, 'feature' sections, and '%N' for newline are Eiffel.",
  },

  {
    language: "Fortran",
    category: "Historic / Legacy",
    code: `program hello
    implicit none
    integer :: i
    do i = 1, 5
        print *, "Hello", i
    end do
end program hello`,
    tell: "'program ... end program', 'implicit none', and 'print *,' are modern Fortran.",
  },
  {
    language: "Fortran",
    category: "Historic / Legacy",
    code: `      PROGRAM AREA
      REAL R, A
      R = 2.5
      A = 3.14159 * R**2
      WRITE(*,*) 'AREA = ', A
      STOP
      END`,
    tell: "Fixed-form columns, 'WRITE(*,*)', and '**' for power are classic FORTRAN 77.",
  },

  {
    language: "Pascal",
    category: "Historic / Legacy",
    code: `program Hello;
var
    i: integer;
begin
    for i := 1 to 5 do
        writeln('Hello ', i);
end.`,
    tell: "'program ... begin ... end.' with ':=' assignment and writeln is Pascal.",
  },

  {
    language: "Ada",
    category: "Historic / Legacy",
    code: `with Ada.Text_IO;
procedure Hello is
begin
    Ada.Text_IO.Put_Line ("Hello, world!");
end Hello;`,
    tell: "'with Ada.Text_IO' and 'procedure ... is begin ... end Name;' are Ada.",
  },

  {
    language: "Lisp",
    category: "Functional",
    code: `(defun factorial (n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))

(format t "~a~%" (factorial 10))`,
    tell: "'defun', deeply nested parentheses, and 'format t' are Common Lisp.",
  },

  {
    language: "Scheme",
    category: "Functional",
    code: `(define (map f lst)
  (if (null? lst)
      '()
      (cons (f (car lst)) (map f (cdr lst)))))

(display (map (lambda (x) (* x x)) '(1 2 3)))`,
    tell: "'define', 'lambda', 'car/cdr', and quoted lists are Scheme.",
  },

  {
    language: "Smalltalk",
    category: "Historic / Legacy",
    code: `| sum |
sum := 0.
1 to: 10 do: [ :i | sum := sum + i ].
Transcript show: sum printString; cr.`,
    tell: "Keyword messages like 'to:do:' with blocks '[ :x | ... ]' and Transcript are Smalltalk.",
  },

  {
    language: "BASIC",
    category: "Historic / Legacy",
    code: `10 FOR I = 1 TO 10
20   PRINT "HELLO "; I
30 NEXT I
40 END`,
    tell: "Line numbers (10, 20, 30) and 'FOR ... NEXT' with PRINT are classic BASIC.",
  },

  {
    language: "Prolog",
    category: "Logic / Query",
    code: `parent(tom, bob).
parent(bob, ann).

grandparent(X, Z) :-
    parent(X, Y),
    parent(Y, Z).

?- grandparent(tom, Who).`,
    tell: "Facts ending in '.', ':-' for rules, and capitalized variables are Prolog.",
  },

  {
    language: "APL",
    category: "Array languages",
    code: `avg ← {(+/⍵)÷≢⍵}
avg 1 2 3 4 5`,
    tell: "Single-character glyphs like ⍵, ←, ÷, and ≢ make APL unmistakable.",
  },

  {
    language: "Algol 68",
    category: "Historic / Legacy",
    code: `BEGIN
   INT n := 10;
   FOR i FROM 1 TO n DO
      print((i, newline))
   OD
END`,
    tell: "Reversed-keyword brackets like 'DO ... OD' and ':=' are Algol 68.",
  },

  {
    language: "REXX",
    category: "Historic / Legacy",
    code: `/* Greet the user */
say 'What is your name?'
parse pull name
say 'Hello,' name'!'`,
    tell: "'/* ... */' comments, 'say', and 'parse pull' belong to REXX.",
  },

  {
    language: "Modula-2",
    category: "Historic / Legacy",
    code: `MODULE Hello;
FROM InOut IMPORT WriteString, WriteLn;
BEGIN
    WriteString("Hello, world!");
    WriteLn;
END Hello.`,
    tell: "'MODULE ... END Name.' with 'FROM ... IMPORT' is Modula-2.",
  },

  {
    language: "C++",
    category: "Systems",
    code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v{1, 2, 3};
    for (auto x : v) std::cout << x << "\\n";
    return 0;
}`,
    tell: "'std::' qualifiers, 'std::cout <<', and '#include <iostream>' are C++.",
  },
  {
    language: "C++",
    category: "Systems",
    code: `template <typename T>
T max(T a, T b) {
    return a > b ? a : b;
}`,
    tell: "'template <typename T>' generic functions are C++.",
  },

  {
    language: "C#",
    category: ".NET",
    code: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, world!");
    }
}`,
    tell: "'using System;' and 'Console.WriteLine' are C#.",
  },
  {
    language: "C#",
    category: ".NET",
    code: `var nums = new List<int> { 1, 2, 3 };
var squares = nums.Select(n => n * n).ToList();
foreach (var s in squares) Console.WriteLine(s);`,
    tell: "LINQ-style '.Select(n => ...)' with 'var' and 'foreach' is C#.",
  },

  {
    language: "TypeScript",
    category: "Mainstream / Web",
    code: `interface User {
    id: number;
    name: string;
}

const greet = (u: User): string => \`Hi, \${u.name}\`;`,
    tell: "'interface' declarations and ': Type' annotations on parameters are TypeScript.",
  },

  {
    language: "Rust",
    category: "Systems",
    code: `fn main() {
    let nums: Vec<i32> = vec![1, 2, 3];
    for n in &nums {
        println!("{}", n);
    }
}`,
    tell: "'fn', 'let', 'vec![...]', '&borrows', and 'println!' macro are Rust.",
  },
  {
    language: "Rust",
    category: "Systems",
    code: `struct Point { x: f64, y: f64 }

impl Point {
    fn norm(&self) -> f64 {
        (self.x * self.x + self.y * self.y).sqrt()
    }
}`,
    tell: "'impl Type { fn method(&self) }' blocks are Rust.",
  },

  {
    language: "Haskell",
    category: "Functional",
    code: `factorial :: Int -> Int
factorial 0 = 1
factorial n = n * factorial (n - 1)

main = print (factorial 10)`,
    tell: "Type signatures with '::' and pattern-matched equations are Haskell.",
  },

  {
    language: "Erlang",
    category: "Functional",
    code: `-module(hello).
-export([greet/1]).

greet(Name) ->
    io:format("Hello, ~s!~n", [Name]).`,
    tell: "'-module(...).' attributes, '->' for clauses, and 'io:format' are Erlang.",
  },

  {
    language: "Elixir",
    category: "Functional",
    code: `defmodule Greeter do
  def hello(name) do
    IO.puts("Hello, #{name}!")
  end
end

Greeter.hello("world")`,
    tell: "'defmodule ... do ... end' with 'IO.puts' and #{} interpolation is Elixir.",
  },

  {
    language: "OCaml",
    category: "Functional",
    code: `let rec fact n =
  if n <= 1 then 1
  else n * fact (n - 1)

let () = Printf.printf "%d\\n" (fact 10)`,
    tell: "'let rec', 'let () =', and 'Printf.printf' point to OCaml.",
  },

  {
    language: "F#",
    category: ".NET",
    code: `let rec fact n =
    if n <= 1 then 1
    else n * fact (n - 1)

[<EntryPoint>]
let main argv =
    printfn "%d" (fact 10)
    0`,
    tell: "'[<EntryPoint>]' attribute and 'printfn' make this F#.",
  },

  {
    language: "Kotlin",
    category: "JVM",
    code: `fun main() {
    val nums = listOf(1, 2, 3)
    nums.forEach { println("n = $it") }
}`,
    tell: "'fun', 'val', 'listOf', and '$it' inside string templates are Kotlin.",
  },

  {
    language: "Swift",
    category: "Mobile",
    code: `let nums = [1, 2, 3, 4, 5]
let squares = nums.map { $0 * $0 }
print(squares)`,
    tell: "'let' with trailing closures using '$0' and 'print' are Swift.",
  },

  {
    language: "Scala",
    category: "JVM",
    code: `object Hello extends App {
  val nums = List(1, 2, 3)
  nums.map(_ * 2).foreach(println)
}`,
    tell: "'object ... extends App' and '_ * 2' shorthand are Scala.",
  },

  {
    language: "Clojure",
    category: "JVM",
    code: `(defn square [x] (* x x))

(println (map square [1 2 3 4 5]))`,
    tell: "'defn', square-bracket arg vectors '[x]', and Lisp parens are Clojure.",
  },

  {
    language: "Perl",
    category: "Scripting",
    code: `#!/usr/bin/perl
use strict;
use warnings;

my @nums = (1, 2, 3);
foreach my $n (@nums) {
    print "n = $n\\n";
}`,
    tell: "'my', '@arrays', '$scalars', and 'use strict;' are Perl.",
  },

  {
    language: "PHP",
    category: "Mainstream / Web",
    code: `<?php
$users = ["Alice", "Bob", "Carol"];
foreach ($users as $u) {
    echo "Hello, $u\\n";
}
?>`,
    tell: "'<?php' tags, '$variables', and 'foreach ($x as $y)' are PHP.",
  },

  {
    language: "R",
    category: "Scientific / Data",
    code: `nums <- c(1, 2, 3, 4, 5)
squares <- sapply(nums, function(x) x^2)
print(squares)`,
    tell: "'<-' assignment, 'c(...)' vectors, and 'sapply' are R.",
  },

  {
    language: "Lua",
    category: "Scripting",
    code: `local function greet(name)
    print("Hello, " .. name)
end

for i = 1, 3 do
    greet("world " .. i)
end`,
    tell: "'local', '..' string concatenation, and 'for i = 1, n do ... end' are Lua.",
  },

  {
    language: "MATLAB",
    category: "Scientific / Data",
    code: `function s = sumSquares(n)
    x = 1:n;
    s = sum(x.^2);
end

disp(sumSquares(10));`,
    tell: "'1:n' ranges, '.^' element-wise power, and 'disp' are MATLAB.",
  },

  {
    language: "Julia",
    category: "Scientific / Data",
    code: `function fib(n)
    n < 2 ? n : fib(n-1) + fib(n-2)
end

println(fib(10))`,
    tell: "'function ... end' with no 'def' and 'println' (one l) suggest Julia.",
  },

  {
    language: "Dart",
    category: "Mobile",
    code: `void main() {
  var nums = [1, 2, 3];
  for (var n in nums) {
    print('n = \$n');
  }
}`,
    tell: "'void main()', 'var', and 'print' (no .ln) with Dart-style strings are Dart.",
  },

  {
    language: "Objective-C",
    category: "Mobile",
    code: `#import <Foundation/Foundation.h>

int main(void) {
    @autoreleasepool {
        NSLog(@"Hello, %@!", @"world");
    }
    return 0;
}`,
    tell: "'@autoreleasepool', '@\"strings\"', and 'NSLog' mark Objective-C.",
  },

  {
    language: "Tcl",
    category: "Scripting",
    code: `proc greet {name} {
    puts "Hello, $name"
}

foreach n {Alice Bob Carol} {
    greet $n
}`,
    tell: "'proc name {args} { ... }' and brace-quoted lists are Tcl.",
  },

  {
    language: "Groovy",
    category: "JVM",
    code: `def nums = [1, 2, 3]
nums.each { n ->
    println "n = $n"
}`,
    tell: "'def' with closures '{ n -> ... }' and 'println' is Groovy (on the JVM).",
  },

  {
    language: "Nim",
    category: "Modern niche",
    code: `proc greet(name: string) =
  echo "Hello, ", name

for n in @[1, 2, 3]:
  greet($n)`,
    tell: "'proc name(arg: type) =', 'echo', and '@[...]' seq literals are Nim.",
  },

  {
    language: "Zig",
    category: "Systems",
    code: `const std = @import("std");

pub fn main() void {
    std.debug.print("Hello, {s}!\\n", .{"world"});
}`,
    tell: "'@import', 'pub fn', and '.{...}' anonymous structs are Zig.",
  },

  {
    language: "Crystal",
    category: "Modern niche",
    code: `class Greeter
  def initialize(@name : String)
  end

  def hello
    puts "Hello, #{@name}!"
  end
end

Greeter.new("world").hello`,
    tell: "Ruby-like syntax but with explicit type annotations like ': String' is Crystal.",
  },

  {
    language: "Visual Basic",
    category: ".NET",
    code: `Module HelloWorld
    Sub Main()
        Dim name As String = "world"
        Console.WriteLine("Hello, " & name & "!")
    End Sub
End Module`,
    tell: "'Sub Main()', 'Dim x As Type', and 'End Sub' / 'End Module' are Visual Basic.",
  },

  {
    language: "Logo",
    category: "Historic / Legacy",
    code: `to square :size
  repeat 4 [ forward :size right 90 ]
end

square 50`,
    tell: "'to ... end' procedures and 'forward'/'right' turtle commands are Logo.",
  },

  {
    language: "Assembly",
    category: "Systems",
    code: `section .data
    msg db "Hello, world!", 0Ah
    len equ $ - msg

section .text
    global _start
_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall`,
    tell: "'section .data/.text', register names like 'rax/rdi', and 'syscall' are x86-64 assembly (NASM).",
  },
  {
    language: "Assembly",
    category: "Systems",
    code: `loop:
    cmp rcx, 0
    je  done
    add rax, rcx
    dec rcx
    jmp loop
done:
    ret`,
    tell: "Labels followed by ':' plus mnemonics like cmp/je/jmp/dec/ret are assembly.",
  },

  {
    language: "VHDL",
    category: "Hardware",
    code: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity AND_GATE is
    port (A, B : in  STD_LOGIC;
          Y    : out STD_LOGIC);
end AND_GATE;

architecture Behavioral of AND_GATE is
begin
    Y <= A and B;
end Behavioral;`,
    tell: "'entity ... port (...)' paired with 'architecture ... of ... is' and 'STD_LOGIC' are VHDL.",
  },

  {
    language: "1C",
    category: "Country-specific",
    code: `Процедура ПриНачалеРаботыСистемы()
    Сообщить("Привет, мир!");
    Для Сч = 1 По 5 Цикл
        Сообщить("Итерация: " + Сч);
    КонецЦикла;
КонецПроцедуры`,
    tell: "Cyrillic keywords like 'Процедура/КонецПроцедуры' and 'Для ... Цикл' are 1C:Enterprise.",
  },

  {
    language: "易语言",
    category: "Country-specific",
    code: `.版本 2

.程序集 程序集1

.子程序 _启动子程序, 整数型, , 本子程序在程序启动后最先执行
    信息框 ("你好，世界！", 0, )
    返回 (0)`,
    tell: "Chinese keywords like '.版本', '.程序集', '.子程序' and '信息框' are 易语言 (Easy Programming Language).",
  },

  {
    language: "Linotte",
    category: "Country-specific",
    code: `âge :: nombre vaut 25
message :: mot vaut "Bonjour"

Saluer:
    début
    affiche message + ", tu as " + âge + " ans!"
    fin`,
    tell: "French keywords 'vaut', 'début', 'affiche', 'fin' with '::' typed declarations are Linotte.",
  },

  {
    language: "قلب",
    category: "Country-specific",
    code: `(عرّف مربع (دالة (س) (* س س)))

(قول (مربع ٥))
(قول "مرحبا، يا عالم!")`,
    tell: "Lisp-style parentheses with Arabic identifiers like 'عرّف', 'دالة', 'قول' are قلب (Qalb).",
  },

  {
    language: "Uiua",
    category: "Array languages",
    code: `Avg ← ÷⧻⟜/+

&p Avg [1 2 3 4 5]
&p ⇌ "racecar"`,
    tell: "Glyphs like '÷⧻⟜/+', '←' assignment, '&p' print, and '⇌' reverse are Uiua (stack-based array language).",
  },

  {
    language: "LOLCODE",
    category: "Esoteric",
    code: `HAI 1.2
I HAS A NAME ITZ "WORLD"
VISIBLE "HAI " AN NAME
KTHXBYE`,
    tell: "'HAI 1.2', 'I HAS A ... ITZ', 'VISIBLE', and 'KTHXBYE' are LOLCODE.",
  },

  {
    language: "Befunge",
    category: "Esoteric",
    code: `"!dlroW ,olleH">:#,_@`,
    tell: "A single line with a reversed string and the control sequence '>:#,_@' is 2D Befunge.",
  },

  {
    language: "INTERCAL",
    category: "Esoteric",
    code: `DO ,1 <- #13
PLEASE DO ,1 SUB #1 <- #238
PLEASE DO ,1 SUB #2 <- #112
PLEASE READ OUT ,1
PLEASE GIVE UP`,
    tell: "'PLEASE DO', '#numbers', 'SUB', and 'GIVE UP' are INTERCAL's polite commands.",
  },

  {
    language: "Wolfram",
    category: "Scientific / Data",
    code: `fact[0] := 1
fact[n_] := n * fact[n - 1]

Print[fact /@ Range[6]]
Plot[Sin[x] Exp[-x/5], {x, 0, 2 Pi}]`,
    tell: "Square brackets for calls 'f[x]', ':=' SetDelayed, '_' patterns, and '/@' Map are Wolfram Language.",
  },

  {
    language: "BQN",
    category: "Array languages",
    code: `Avg ← +´÷≠

•Show Avg 1‿2‿3‿4‿5
•Show ⌽ "racecar"`,
    tell: "Glyphs like '+´÷≠', '←' assignment, '‿' strand separator, and '•Show' are BQN (a modern APL successor).",
  },
];
