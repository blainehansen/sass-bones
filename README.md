# sass-bones

> A sass interface framework focused on unification and cleanliness.

---

```bash
npm install --save sass-bones
```


## Bones, Skin, and Muscle

Three layers of an *interface*, which consists of:

- *semantic layout* (Bones)
- *aesthetic presentation* (Skin)
- *dynamic cues* (Muscle)

this is different than bootstrap in this way:
bootstrap is really an *interface framework*, in that it's made bones/skin/muscle assumptions already for you. basically this system is moving up the abstraction chain a step, by giving you a framework that would allow you to create different kinds of bootstraps.

## Bones and Skin

Bones and Skin work together to create a cohesive design, but they work on completely separate parts of that design.

Bones is all about layout, and it's about layout in the abstract sense. All sizes are defined by the type scale system (an abstract relationship of all fonts to each other), rhythm units (an abstract unit related to the font sizes in the type scale system), and the `px()` function (a function that transforms an easy to reason about css measurement into a unit relative to the root font size).

And that's even when sizes are considered *that* concretely. Mostly layouts are done with a grid (a completely relative value that depends on the surrounding viewport size), or simply in wrapped layouts that are abstractly defined flows.

Bones is simply about what exists, and where it is relative to other things.

Bones provides many *abstract components* that must be applied to real components you'll use, that simply define how that thing is laid out. They only concern that one quality, which means they don't overlap with other things. Since they're abstract, they have the ability to have particular sizing or other measurement considerations filled into them.

You can then take these abstract components and fill them into real components

Since sometimes pure css isn't capable of correctly doing *any* layout, Bones also simply defines a series of potential *dynamic* or otherwise javascript requiring layout configurations, and provides libraries in various front-end frameworks to manifest those. They have to be components.


Skin is purely about aesthetics, without any consideration for layout, but particular variables dealing with the "feel" of the layout can be provided by Skin, such as the "airiness" of the layout. Skin determines what colors exist and where applied, what border types there are and where applied, what the exact fonts are and where applied, and all other random things like box-shadows and etc etc. Skin is the *css* part of this system, and Bones is only concerned with semantic layout.


Muscle is a theoretical ability, that allows you to graft any animation onto a thing with only css.
This would obviously have limits, since not all potential animations are available in pure css.
The supplement is to do the same thing as with js requiring layouts, and simply define *types* that a front-end framework would fill in.








## The Additive Box Model

One of the biggest problems Bones was built to solve was unsemantic templates. For a long time we've been used to templates with lots of elements that only serve a styling/layout function, and that cloud the real intention of the template. Ultimately our templates are really about presenting data to the user and giving them tools to manipulate it, and anything that isn't directly contributing to that purpose is in the way.

Take a template like this:

```jade
#app
	.container.fluid
		.row
			.col-lg-4.col-lg-offset-4.col-md-6.col-md-offset-3.col-sm-8.col-sm-offset-2.airy-col
				p Finally!
				p Four layers down...
				.row.image-gallery
					.col-xs-6.col-sm-3
						img(src="happy-puppies.jpg").img-responsive.square-image
					.col-xs-6.col-sm-3
						img(src="smiling-flowers.jpg").img-responsive.square-image
					.col-xs-6.col-sm-3
						img(src="waving-people.jpg").img-responsive.square-image
					.col-xs-6.col-sm-3
						img(src="sunny-lake.jpg").img-responsive.square-image
```

Ultimately, all this template is trying to achieve is displaying some text, and a gallery of images. But there's so much nesting and extra elements that only serve to create the layout, that it takes a second to understand. Does the fact that the real content of the page should be centered, have plenty of padding, and only take up a reasonable amount of screen space, really deserve all these extra elements and classes? `.container.fluid .row .col-lg-4.col-lg-offset-4.col-md-6.col-md-offset-3.col-sm-8.col-sm-offset-2.airy-col`. Does the fact that the image gallery should space the pictures evenly at the same size, and fit a reasonable number to the screen size, deserve all this? `.row .col-xs-6.col-sm-3 .img-responsive.square-image` This status quo introduces clutter and makes the template brittle and inflexible.

Bones goes about it a different way:

```jade
#app
	p Whoa already?
	.image-gallery
		img(src="happy-puppies.jpg")
		img(src="smiling-flowers.jpg")
		img(src="waving-people.jpg")
		img(src="sunny-lake.jpg")
```
```sass
#app
	+bn-block-shell($size: (lg: 4, md: 6, sm: 8))
	+bn-content-holder('airy')

	.image-gallery
		+bn-column-holder($gutter: (xs: 1ru, md: 2ru, xl: 3ru), $column-selector: 'img', $column-size: (sm: 3, xs: 6))
		img
			+bn-responsive-square-image
```

Now all the layout and styling considerations are completely separated into the stylesheet.

Semantic markup provides many benefits we might not have even thought about, like the ability to allow users to customize their layout, providing different layouts for users to choose from, allowing easy [progressive enhancement](https://www.smashingmagazine.com/2017/07/enhancing-css-layout-floats-flexbox-grid/) or to change your entire UI system without building completely different templates.

So how do we actually achieve this? How do we make layout elements that can have the flexibility to avoid all these layers of nesting?


### Shells and Holders

Every box inherently has two types of relationships: to the outside, with elements above it and its siblings; and to the inside, with elements within it. Bones separates these two layers of thinking into Shells and Holders respectively, and gives different box types to handle each relationship.

Shells only concern themselves with the size and margins, and the qualities that change how it relates to the outside world, like `display` and `position`.

Holders only concern themselves with padding, the display types that determine the nature of child layout, like [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), [gridbox](https://css-tricks.com/snippets/css/complete-guide-grid/), and more manual grid systems like the one that we'll discuss soon.

The reason this distinction is so powerful, is that one element can act in two capacities at the same time. Old systems of thinking put the two together, and often unsemantic nesting was necessary because you needed one type of element to behave towards the outside one way, and another inside it to behave towards it's children in another way. And we often needed to created a whole host of children elements to go with their parent elements, and some things weren't compatible with each other... etc.


## Abstract and Concrete

Another thing that makes the typical design framework arduous and difficult to work with is that there's no distinction (or an inflexibly implemented distinction) between the abstract and the concrete. Take the example of a box that must be spaced away from all things around it. That will certainly be achieved with margin, and the fact that the box is spaced away from things is the *abstract* idea. And even the question of whether it's spaced more on the bottom that the other sides is still abstract. But exactly how much it's spaced is the concrete part. When we actually fill in a real value, it becomes concrete.

Bones has many tools and paradigms to make it easy to apply only abstract ideas to elements, while exposing hooks to the exact concrete values that can easily be changed without maintaining huge variable lists. 


## Grid

By default, the Bones Grid uses a 12 column system. But because of Shells and Holders, any box-type element can be either a row or a column, without having to nest just to get the layout right.

The Bones Grid system consists of two types of Shells:

- the Block Shell, one that takes up its entire available horizontal space (the row in other systems)
- the Column Shell, one that takes up only as much as you specify, and shares the remainder with other things

There's also the Root Shell, which simply applies some logical resets to the `body` element.



For the consideration of grid gutters, there's a few overall options:

- use gridbox! it's got good support in general, and handles all concerns perfectly and gracefully
- for unknown/agnostic grid situations, use normal float stuff, and accept that the outer gutter won't be as large as the internal ones (only margins on the children are used)
- a directly managed one can ensure that all gutters are the same


so there are three types of column holders:

- agnostic. it knows nothing!!

-- columns set their own gutter
-- this is only really necessary in situations where the contents will be mixed
-- if you know something touches the edge and want to make the gutter perfect, there could be `$touches-edge: (top, right)`
- directly managed, it knows gutter
-- since this is only a holder type, we can be sure it's separated well from the shell it's taking.





### Block Shell

This Shell takes up all available horizontal space without sharing. Created with the `bn-block-shell` mixin, there are two basic arguments:

- `size`: the size of the actual content box, in columns. By default this space will always be centered.
- `push-right` and `push-left`, `from-right` and `from-left`, `pin-right` and `pin-left`: various options to move the content box left or right, away from the center. The two `push`es shift the box from center the specified number of columns, and the `from`s both set the box that many columns away from that side. The `pin`s are boolean shorthands to move all the way to one side. These options are all mutually exclusive, you can only use one on any particular box.

```sass
#my-box
	+dy-hang('%bn-block-shell', $states: ('size': 'sm(8) md(6) lg(4)', 'pin-right': true))
```


### Column Shell

This box can share its horizontal space with other elements, and is created with the `bn-column-shell` mixin:

- `size`: the size, similar to the Block Shell.
- `margin-right`, `margin-left`, and `margin-x`: these all deal with the empty space margin on the horizontal axis, and can be used to offset the column. `margin-x` defines both left and right to be the same value.

```sass
#my-box
	+dy-hang('%bn-column-box', $versions: ('.padded'), $states: ('size': 'sm(8) md(6) lg(4)', 'push-right': 'xs(2)'))
```


<!-- a potential idea is to have two shell types of fixed and relative, so that we can do grid-based measurements on the positioning of those items -->


There are a few different Holder types. By default all elements are simply what we'll call a "Blank" Holder, they have no padding, and no direct control over children. Some Holders directly manage their children, like the Column Holder, or the various Flexbox or Gridbox Holders. Others simply apply padding and let the children manage themselves. Others are a combination, and manage some kinds but not all.



### Column Holder

This Holder is for Grid layouts where you want to directly manage the children. Use this if all the children are the same column type, follow a set pattern of column types, or deviate from the normal grid conventions in some way.

- `gutter`: distance from the border edge to the actual margin. Should be measured in `ru`.


<!-- ### Bordered Boxes

Any box can have the abstract interface `%bn-bordered` mixed into them, but Block and Column Boxes will use the border width to ensure the sizing all still works out. -->


### Flexbox Holder

Obviously Flexbox provides its own interface for creating arbitrary layouts, but these are a common set of shorthands we thought would be nice to include.


### Gridbox Holder

The new [Gridbox](https://css-tricks.com/snippets/css/complete-guide-grid/) system is here, and becoming better supported, and this Holder provides some common shorthands in the same way that the Flexbox Holder does. This also gives us an opportunity to provide good progressive enhancement fallbacks for browsers where this still isn't fully supported.


### Padding Holder

The simplest Holder, this just gives a variety of options to unify the padding of your boxes.


### Media Content Holder

This Holder is great for containing arbitrary content, such as the kind you'd see in a blog post. There are two general kinds, a strict and a lenient, that take different approaches. The strict uses horizontal padding to force every single element within to a certain maximum width. The lenient gives elements the opportunity provide their own horizontal padding, allowing them to have different widths based on what they are. A good example of why you might use lenient is to make text blocks and images different widths.





Since you can extend from these, that means you can do "containering" very easily. All your basic containers will simply extend a type that has the responsiveness you desire, so you don't have to constantly wrap your elements in an un-semantic `.container`, and you can have something that breaks from the containering.

you can make versions of these that you can quickly extend





## Components



### Registration System

Bones allows you any third party library you import to add new component types, and allows you to modify


```sass
+bn-register-component('third-party-component', $component-definition)


+bn-component-modify-defaults('third-party-component', $map-with-new-values)

+bn-component-type('third-party-component', 'custom-type', $my-custom-type)

.thing
	// this mixin added by a third party uses
	+bn-third-party-component(arg, other-arg, $type: 'custom-type')

		+bn-get-component-type('third-party-component', 'custom-type')
```





steal bootsrap and bulma etc and make them abstract


abstract components
don't define any versions?
don't define any outputs?

interface




## Flexbox and abstract layout Shorthands


row boxes - rows are only considered, everything is conceived of in that way
flow boxes - basically miscellaneous, for things that relate to each other unusually
content boxes - only basic content types, or things that should maybe be floatable or that move in a "reading" rhythm
control boxes - like the grid box stuff kinda??? for things that are "boxed" but also aren't just rows???


with js component boxes, we could absolutely achieve a kind of grid-box system!



we could potentially call these box types *flow boxes* to ensure no overlapping confusion with flexbox, but still make them different than grid boxes

these could use a concept of an *axis gutter* or *axis spacing* or *axis margin* for both main and cross axes, that would allow them to specify how far apart the contents were from the container, and from each other




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
	+sizing('lg(6), md(10)')
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

Here, each of these blocks simply takes on the role of an existing abstract component definition, without having any extra classes added to the elements in the template. And since they just are filling in, the selector names can stay short. And since they are nested, they don't have to be very specific.


## Media Queries and Responsive Tokens

Bones comes with the `bn-media` mixin to make responsive media queries easier.

Set up your breakpoints

```sass
$bn-breakpoints: (
	xs: 0px,
	sm: 576px,
	md: 768px,
	lg: 992px,
	xl: 1200px,
)
```

This mixin has a few useage patterns, allowing for up, down, ranges, and not.

```sass
.thing
	// starting at this breakpoint and up
	+bn-media(sm)
		color: red

	// the same
	+bn-media(sm-up)
		color: red

	// including sm, and down
	+bn-media(sm-down)
		color: red

	// only at sm
	+bn-media(sm-only)
		color: red

	// from sm to lg, inclusive of both
	+bn-media(sm-lg)
		color: red

	// the same
	+bn-media(sm-lg-only)
		color: red

	// everywhere *but* sm
	+bn-media(sm-skip)
		color: red

	// everywhere *but* the inclusive range from sm to lg
	+bn-media(sm-lg-skip)
		color: red
```

Make sure not to name any of your breakpoints `up`, `down`, `only`, or `skip`!

You can also lump any range into shorthands.

```sass
$bn-breakpoints-shorthands: (
	mobile: sm-down,
	tablet: md-only,
	desktop: md-up
)

.thing
	+bn-media(mobile)
		color: red

	// you can use modifiers on your shorthands too
	+bn-media(mobile-skip)
		color: red
```


### Responsive Tokens

You may have noticed strings like this: `+bn-block-shell((lg: 4, md: 6, sm: 8))`. Bones uses these Responsive Tokens as a shorthand to apply responsive grid measurements to attributes. Responsive Tokens can be used for anything, but are mostly used for size, padding, margins, and positions. The format is `breakpointname(argument)`. Responsive Tokens can be used with breakpoint shorthands as well: `'mobile(10) desktop(5)'`

All arguments to Bones mixins and component types are compatible with Responsive Tokens unless stated otherwise, and you can use the `bn-responsive` mixin to apply them to anything you want.

```sass
.different-directions
	// each of these will be applied to flex-direction
	// at the specified breakpoint
	+bn-responsive(flex-direction, (xs: column, sm: row, xl: row-reverse))

	// equivalent to this:
	+bn-media(xs)
		flex-direction: column

	+bn-media(sm)
		flex-direction: row

	+bn-media(xl)
		flex-direction: row-reverse
```

Since these arguments are always strings, and sometimes you need to do some operation on them to actually make them valuable, there's also a `$function` argument to this mixin, that passes your string values through it before setting the value.

```sass
.changing-hsl
	+bn-responsive(background-color, (xs: hsl(0deg, 60%, 60%), md: hsl(50deg, 30%, 30%)))
	// +bn-responsive(background-color, 'xs(0deg, 60%, 60%) md(50deg, 30%, 30%)', $function: hsl)

	// equivalent to this:
	+bn-media(xs)
		background-color: hsl(0deg, 60%, 60%)

	+bn-media(md)
		background-color: hsl(50deg, 30%, 30%)
```

Responsive Tokens also allow for the same kind of specificity as the `bn-media` mixin. Just put the arguments you'd put in a `bn-media` call as dashed suffixes to the responsive token.

```sass
.thing
	// these colors won't look very good...
	// but you get the idea
	+bn-responsive(color, 'sm-down(red) md-up(green)')
	+bn-responsive(background-color, 'md-skip(purple) md-only(orange)')
	+bn-responsive(border-color, 'sm-md-skip(yellow) sm-md(blue)')
	```


## Progressive Enhancement

There are three basic tiers for progressive enhancement of layout.

- Basic is for browser that don't support flex or grid. Floats are used.
- Flex is for browser that support flex but not grid.
- Grid is for browser that support grid.

```sass
.thing
	+bn-progressive(basic)

	+bn-progressive(flex)

	+bn-progressive(grid)
```



## Global Rhythm

If you're completely unfamiliar with the idea of Vertical Rhythm and would like to understand it in depth, read [this article](https://zellwk.com/blog/why-vertical-rhythms/). For now just know that it's a way of making all the vertical sizes on your page look proportional by using a certain measurement over and over.

Vertical Rhythm is an incredibly powerful concept in good design, and it's something that Bones uses in *everything*, not just the typography. Bones makes it effortless to create designs where every element seems proportional and cleanly lines up with the things around it.


## The Rhythm Unit (ru)

The Rhythm Unit (which I'll abbreviate from now on as `ru`) is the single measurement that will act as the foundation for an entire Bones layout. All fonts will use it for their line heights, boxes can be sized with it, paddings and margins will use it, and they'll all tend to do so in small whole numbers. Basically anything in your layout that isn't specified by the grid system is specified by the ru, and this is a beautiful thing, because it makes all the spacial relationships between the various elements incredibly clear.

You can set both the base font size for the html element, as well as the size of the ru unit. When setting the size of the ru unit, you're choosing a ratio compared to the base font size, and that ratio will determine the default line-height as well.

```sass
$bn-base-font-size: 16px

$bn-ru-number: 1.25 // sets it directly (you've done the math)

$bn-ru-ratio: 5/4 // Bones will do it for you :)

	// all of these values are the defaults
```


### The `ru()` Function

To use the rhythm unit anywhere in your design, just use the `ru()` function and pass in a nice smooth number.

```sass
.picture-tile
	width: ru(10)
	height: ru(15)
```

You can also use them in [responsive tokens]() by simply adding `ru` to the end.

```sass
.content-column
	@include padding(xs-2ru, sm-4ru)
```
initializers and other processing functions to establish baselines on html and such.

you can size everything in rhythm units, with the `ru()` function, and the `px()` function, although it's more a release valve and shouldn't be used.



## Mixables

Very often in design we want to be able to have a certain group of states or transforms that we could apply to many different things. Also, since the Bones layer is only really about abstract layout, and the specific values that should be applied are something that should be left up to the Skin layer and the developer, these Mixables allow you to take general qualities and paint them onto things without forcing the developer's hand. 

```sass
%color-able
	+dy-deployable

	+dy-define-state('color', gray)

	&.primary
		+dy-define-version('color', )
```

```sass
%disable-able
	+dy-deployable

	&.disabled
		+dy-define-transform('color', scaled-desaturate, 'this.color', 80%)
		+dy-transform-no-compounding
		cursor: not-allowed

	&:disabled
		+dy-define-transform('color', scaled-desaturate, 'this.color', 80%)
		+dy-transform-no-compounding
		cursor: not-allowed
```

```sass
%interact-able
	+dy-deployable
	+dy-inherit('%disable-able')

	cursor: pointer

	&:hover
		+dy-define-transform(color, lighten, 'this.color', 10%)

	&:active
		+dy-define-transform(color, darken, 'this.color', 30%)
		
	&:focus
		+dy-define-transform(color, lighten, 'this.color', 10%)
```

```sass
%border-able
	+dy-deployable

	+dy-define-state('border-radius', 2px)
	+dy-output(border-radius)

	&.sharp-corner
		+dy-define-version('border-radius', 0px)

	&.soft-corner
		+dy-define-state('border-radius', 4px)


	+dy-define-state('border-width', 3px)
	+dy-output(border-width)

	&.fine-border
		+dy-define-version('border-width', 2px)

	&.thick-border
		+dy-define-version('border-width', 4px)
```


```sass
%state-able
	+dy-deployable

	+dy-define-state('color', gray)

	&.danger
		+dy-define-version('color', bn-color(red, feedback))

	&.warning
		+dy-define-version('color', bn-color(yellow, feedback))

	&.success
		+dy-define-version('color', bn-color(green, feedback))
```

```sass
.button
	+dy-deployable
	+dy-inherit('%state-able')
	+dy-inherit('%interact-able')
	+dy-inherit('%disable-able')

	+dy-hang('%border-able')

	// all for the default '.solid' type
	+dy-output-function(color, scaled-lighten, 'this.color', 80%)
	+dy-output(background-color, color)
	+dy-output-function(border-color, scaled-darken, 'this.color', 10%)

	&-edgeless
		+dy-deployable
		+dy-inherit('.button')

		+dy-output(color)
		+dy-output(background-color, scaled-lighten, 'this.color', 80%)
		+dy-output-function(border-color, fade-out, 'this.color', 100%)

	&-inverse
		+dy-deployable
		+dy-inherit('.button')

		+dy-output(color)
		+dy-output(background-color, scaled-lighten, 'this.color', 80%)
		+dy-output(border-color, color)
```



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







## Color

```sass
$bn-hues: (red: 10deg, blue: 198deg)

$bn-colors: (primary: (red, subdued))

$bn-color-types: (subdued: (middling, 65%), shocking: (bright, zenith))

$bn-saturations: (muted: 10%, middling: 55%, bright: 95%)
$bn-lightnesses: (twilight: 20%, zenith: 80%)

$bn-alphas: (solid: 1, frosted: 0.8, glass: 0.2)

.component
	// colors
	color: bn-color(primary)

	// hue, type
	color: bn-color(red, subdued)

	// hue, saturation, lightness
	color: bn-color(red, muted, twilight)

	// hue, saturation, lightess, alpha
	color: bn-color(red, muted, twilight, frosted)

	opacity: 
```


```sass
+bn-output-colors('is')

@mixin bn-output-colors($prefix: 'is')
	@each $hue in $bn-hues
		.#{$prefix}-#{$hue}
			@if map-has-key($bn-color-types, default)
				color: bn-color($hue, default)
			@else if map-has-key($bn-saturations, default) and map-has-key($bn-lightnesses, default)
				color: bn-color($hue, default, default)

			@each $color-type in $bn-color-types
				&.#{$prefix}-#{$color-type}
					color: bn-color($hue, $color-type)

			@each $saturation in $bn-saturations
				@each $lightness in $bn-lightnesses
					&.#{$prefix}-#{$color-type}
						color: bn-color($hue, $saturation, $lightness)
```



# Roadmap

- [ ] allow out-of-the-box progressive enhancement
- [ ] figure out box type coercion





```sass
%responsive-able
	+dy-deployable

	+dy-define-state(media-query-function, bn-media)

	+dy-define-state(mobile-query, mobile)
	+dy-define-state(tablet-query, tablet)
	+dy-define-state(desktop-query, desktop)

	+dy-define-state(real-xs, px)
	+dy-define-state(real-sm, px)
	+dy-define-state(real-md, px)
	+dy-define-state(real-lg, px)
	+dy-define-state(real-xl, px)


.deployable
	+dy-deployable
	+dy-inherit('%responsive-able')

	+dy-define-state(color, red)
	+dy-define-state(column-selector, 'img')
	+dy-output(color)

	// these various "nestable" mixins set a global "context stack" that is used to know where to put outputs
	+dy-block(column-selector)
		+dy-output(background-color, color)
		+dy-output(border-color, color)
		// we could theoretically keep nesting if we wanted

	// the static version
	+dy-media(bn-media(sm-only))
		+dy-output(background-color, color)

	// the dynamic version
	// it would be an interesting idea to allow even functions to be dynamically resolved
	+dy-media-function('this.media-query-function', 'this.mobile-query')
		+dy-output(background-color, color)
```














<!-- ## Box Type Coercion

Element nature coercion
- make anything behave like a box, a content, a control, or a decoration, but only bother to do this for types that have a useful behavior or an ambiguous or flexible semantic nature.
- have notable exceptions for some elements which are by their nature one type.

Element appearance coercion
- make links appear like buttons, things like that.

this might be a phantom distinction, since different appearance types usually have a different nature in terms of layout.
Skin and Bones both changes boxes differently.



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


we need a div type that allows multiple sizes of text, but where the entire box is sized according to one particular size. The baselines all need to line up -->