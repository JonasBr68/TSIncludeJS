# TSIncludeJS
Super simple fluent TypeScript/JavaScript API to include JavaScript dependencies, instead of adding a bunch of &lt;script... &gt; tags, or when you want something simple instead of for instance RequireJS etc.

Add you script with dependencies like:    
<code>&lt;script src="../src/include.js" type="text/javascript" data-boot="tests.js">&lt;/script></code>    
where tests.js is your script that defines dependencies and your code. 

The sample on http://jonasbr68.github.io/TSIncludeJS/sample/unittesting.html
for instance uses a tests.js file like below.
With a fluent api you specify dependency/load order, and wrap your dependent code in an anonymous function.
  
<pre><code>
    TSIncludeJS.include("https://code.jquery.com/jquery-2.1.4.js")  <br />
                .include("http://code.jquery.com/qunit/qunit-1.20.0.js")    <br />
                .done(function () {    <br />
   
              QUnit.test("hello test", function (assert) {    <br />
                  assert.ok(1 == 1, "Works!");    <br />
              });    <br />   
    
              QUnit.test("jquery test", function (assert) {    <br />
                assert.ok((typeof $ === "function"), "Works!");    <br />
              });    <br />
    
      });     <br />
</code></pre>     

