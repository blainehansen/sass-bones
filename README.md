# sass-bones

> A sass framework that completely reenvisions the way we build websites. Focused on unification and cleanliness.

This repository is under construction.

<!-- ---

```bash
npm install --save sass-bones
```

## Global Rhythm

you can size everything in rhythm units, with the `ru()` function



## Grid

all grid boxes have the sizing/margin (it's referred to as sizing in boxes that take up horizontal) and gutter distinction

margin | gutter | border | padding

anything can be coerced into these types


you can make versions of these that you can quickly extend

we can only gutter things whose width is known

```sass
%my-generic-container
	+dy-deployable('%bn-block-box')

	+bn-sizing()
	+bn-gutter()
	+bn-padding()

	+dy-build

#content
	@extend %my-generic-container
```


There are two types of grid boxes
block boxes and column boxes
they are deployable components

mixins and placeholders to create short versions of them

block boxes take up entire available horizontal space no matter what




```jade
#app
	#sidebar
	#content
		.
```

```sass

```


## Box Type Coercion (Additive Box Model)

content element
can be flowing, block, sharing
this is basically always text, or something that will be flowing with text

control element
this is a box, that is a part of a control interface rather than any other particular thing
its position relative to other things is what really matters

the big thing here is that these are sized *only according to how they fit into their interface*. Rather than having whitespace that is specific to the type (or even needing any kind of text type like span or p or h1) like content text does, they are simply anonymous boxes that behave how you require them to

column box
a box that is self contained, but shares horizontal space

block box
a box that takes up all available horizontal space


there are boxes and there are elements
boxes just hold other things. they're "transparent" to the user but help create layout
elements actually present information or interactability to the user



## Typograpy


```sass
$bn-base-font-size: 16px

$bn-line-height-ratio: 5 / 4
$bn-line-height-ratio: 1.25

$bn-type-scale-number: $bn-type-scale-perfect-fourth
$bn-type-scale-number: 1.333

$bn-type-scale-shorthands: (
	hero: 7,
	big: 3,
	important: 1,
	fine-print: -2
)

.text
	+type-scale(hero)
	+type-scale(2)

	// these are all identical
	+type-scale(0)
	+type-scale()
	+type-scale
```



takes heed of breakpoints

can set base fonts at breakpoints
can set base/ru ratio either for each breakpoint or globally

typographic scale ratio

single mixin that outputs size/line-height


what do we need

base font size
(possibly at *each* breakpoint)

line-height/font-size ratio
(unless ru is a mixin that outputs to a value, not possible at each breakpoint)

typographic scale ratio
(possibly at *each* breakpoint)

shorthand names

certainly some basic support for manual declarations

no support for incremental leading yet

(maybe the minimum "leader" or whitespace in a line. used to ensure font sizes don't get too close to line heights)


`ru()` function
multiples of line-height


$bn-base-font-size: 16px






## Components

steal bootsrap and bulma etc and make them abstract


## Flexbox and abstract layout Shorthands


medallion types
basic: a single thing that is just centered in its parent
row: a single row of things that are centered in their parent
column: a single column of things that are centered in their parent

parted
left-right: one group of things on the left, another on the right
top-bottom: same but top bottom
cornered: individual things in corners


pushes
classes that just set margin in an existing manual flexbox layout


item-bag
a thing that holds things with wrapping
loose: they set their own size
strict: we set their size
centered, left, right, etc

line, or level or whatever
a single line of things



## Abstract Component Methodology ("hangers")

The idea is to never have to add any more than one selector to a thing

if this thing is globally unique, it has an id
if it is one of a type, it has a class

those classes are *descriptive* rather than prescriptive. it describes what the thing semantically is, not how it appears

so, all componenents are created as abstract types, with abstract sub-types, and then those can be "hung" onto whatever semantic selectors you choose.


```jade
//- here each only has exactly one selector, that describes what this thing is
#content
	.gallery
		.item
			img(src="puppies.jpg")
			.caption puppies
		.item
			img(src="thing.jpg")
			.caption thing
```

```sass
#content
	+dy-deployable('%row-box')
	+sizing(lg-6, md-10)
	+gutter(2ru)
	+padding(lg-3ru, md-1ru)

	+dy-build

	@extend %my-theme-muted-human-content

	.gallery
		@extend %bn-gallery

		.item
			@extend %bn-gallery-img-block
			border-color: bn-color(primary, muted)

			.caption
				@extend %bn-gallery-img-caption
```

Here, each of these blocks simply takes on the role of an existing abstract component definition, without having any extra classes added to the elements in the template. And since they just are filling in, the selector names can stay short. And since they are nested, they don't have to be very specific. -->