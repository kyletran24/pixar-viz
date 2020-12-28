import define1 from "./b2bbebd2f186ed03@1080.js";
import define2 from "./848ede03e6b8a9d1@163.js";
import define3 from "./e93997d5089d7165@2286.js";
import define4 from "./91007ee9d5fd152b@214.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["pixar@1.json",new URL("./files/49ffa7dd595d1d0b23f4cc6a00d4d5799f977b258f1516526404f0126f3be8286f9da5bcbd5fb16261c27c3354a85b6e4a086e83de470ba39310280ddcd2aa59",import.meta.url)],["dreamworks.json",new URL("./files/c9a4d5768a27ffbe83790060e801f40c6a4f90f3fdd2536ae1fe48c20e22fd3d49b11284b11a14948bb231222455e5368493721b9a0d494c6781f8e0234f4125",import.meta.url)],["disney.json",new URL("./files/b341c41a5c16af4d939374f2882b7c7d85d92a257fce422d1df81997a59c164c311c3f997998e42fc67647a12fc4d090434438e1d1f90b12d29fa4fc5459039d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("title")).define("title", ["md"], function(md){return(
md`
# Analysis of the success of Pixar movies against popular competitors
`
)});
  main.variable(observer("viewof year_threshold")).define("viewof year_threshold", ["rangeSlider"], function(rangeSlider){return(
rangeSlider({
  min: 1947,
  max: 2019,
  step: 1,
  value: [2016, 2019],
  description: 'Show all movies in this time range'
})
)});
  main.variable(observer("year_threshold")).define("year_threshold", ["Generators", "viewof year_threshold"], (G, _) => G.input(_));
  main.variable(observer("viewof order")).define("viewof order", ["select"], function(select){return(
select({
  title: "Sort by",
  description: "Select a criterion to sort movies",
  options: ["Alphabetically", "Chronologically","Reverse-Chronologically", "Ascending Budget", "Descending Budget", "Ascending Revenue", "Descending Revenue", "Ascending Rating", "Descending Rating"],
  value: "Descending Revenue"
})
)});
  main.variable(observer("order")).define("order", ["Generators", "viewof order"], (G, _) => G.input(_));
  main.variable(observer("main_plot")).define("main_plot", ["d3","width","height","pad","pixar_data","disney_data","dw_data","addWebFont","year_threshold","num_films","compare_arr","compare_scale","budget_extent","rate_extent","rev_extent","plot_size","pixar_film_scale","budget_scale","rev_scale","hover_budget","hover_rr"], function(d3,width,height,pad,pixar_data,disney_data,dw_data,addWebFont,year_threshold,num_films,compare_arr,compare_scale,budget_extent,rate_extent,rev_extent,plot_size,pixar_film_scale,budget_scale,rev_scale,hover_budget,hover_rr)
{
  // Declare canvas
  let svg = d3.create('svg').attr('width', width).attr('height', height);
  let g = svg.append('g').attr('transform', `translate(${pad},${pad})`);


  // Error checking
  // Only display visualization if there are Pixar movies and Disney/DW movies to compare with in time range
  if (pixar_data.length && (disney_data.length || dw_data.length) ) {

  /*                                            BEGIN OF TOP SECTION                                          */

    //                  NOTES BEGIN

    g.append("text")
      .text("abc")
      .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,300&display=swap')
      .attr("x", -48)
      .attr("y", -40)
      .attr("font-size", "12px")
      .text("All figures are shown by hundred-million dollars")
      .attr("font-style","italic");

     g.append("text")
      .text("abc")
      .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,300&display=swap')
      .attr("x", -48)
      .attr("y", -26)
      .attr("font-size", "12px")
      .text("Showing movies from " + year_threshold[0] +" to "+ year_threshold[1])
      .attr("font-style","italic");

      g.append("text")
      .text("abc")
      .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,300&display=swap')
      .attr("x", 780)
      .attr("y", -40)
      .attr("font-size", "12px")
      .text("Hover over bars for more info.")
      .attr("font-style","italic");

      //                  NOTES END


      //                  LEFT-SIDE IMAGES SECTION BEGIN

      g.append("svg:image")
       .attr("xlink:href",       "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/DreamWorks_Animation_SKG_logo_with_fishing_boy.svg/1200px-DreamWorks_Animation_SKG_logo_with_fishing_boy.svg.png")
       .attr("x", -52)
       .attr("y", 5)
       .attr("width", 50)
       .attr("height", 30);

      g.append("svg:image")
      .attr("xlink:href", "https://i.pinimg.com/originals/dc/5f/ee/dc5fee0189b193c8ebf8e19076ad56f0.png")
      .attr("x", -52)
      .attr("y", 55)
      .attr("width", 50)
      .attr("height", 30);

      g.append("svg:image")
      .attr("xlink:href", "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/DreamWorks_Animation_SKG_logo_with_fishing_boy.svg/1200px-DreamWorks_Animation_SKG_logo_with_fishing_boy.svg.png")
      .attr("x", -50)
      .attr("y", 100)
      .attr("width", 50)
      .attr("height", 30);

      g.append("svg:image")
        .attr("xlink:href", "https://i.pinimg.com/originals/dc/5f/ee/dc5fee0189b193c8ebf8e19076ad56f0.png")
        .attr("x", -52)
        .attr("y", 155)
        .attr("width", 50)
        .attr("height", 30);

      g.append("svg:image")
        .attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pixar_logo.svg/1024px-Pixar_logo.svg.png")
        .attr("x", -58)
        .attr("y", 190 + 250 * num_films/16)
        .attr("width", 60)
        .attr("height", 40);

     //                  LEFT-SIDE IMAGES SECTION END

      let top_g = g.append("g")
        .attr("class", "top_g");

      // // Big outer outline rect for top_g
      // let compare_rect = top_g.append("rect")
      //   .attr('width', plot_size)
      //   .attr('height', plot_size/3.5)
      //   .attr('stroke', d3.hcl(0,0,60))
      //   .attr('stroke-width', .5)
      //   .attr('fill', 'none')

      // Group elements corresponding to each row
      let compare_g = top_g.selectAll("g")
        .data(compare_arr)
        .enter()
        .append("g")
        .attr('transform', d => `translate(0,${compare_scale(d.title)})`)
        .attr('class', 'compare_g');

      // Outline rects for each row
      // let top_budget_outline = compare_g.append("rect")
      //   .attr('width', plot_size)
      //   .attr('height', 30)
      //   .attr('stroke', d3.hcl(120,0,50))
      //   .attr('stroke-width', 0.5)
      //   .attr('fill', 'none')
      //

      // Labels for reach row
      compare_g
        .append("text")
        .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
        .attr("x", 10)
        .attr("y", d => d.budget >= 0 ? 20 : 10)
        .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .attr("font-family", "Merriweather")
        .attr("font-size", d => d.budget >= 0 ? "16px" : "12px")
        .attr("font-style", d => d.budget >= 0 ? "normal" : "italic")
        .text(d => d.title);

      // Budget rects for top section
      let top_budget = compare_g.append("rect")
        .attr("x", d => 230 + 220 *(1 - (d.budget / budget_extent[1])) )
        .attr("y", 10)
        .attr('width', d => 220 * (d.budget / budget_extent[1]))
        .attr('height', 10)
        .attr('fill', d3.hcl(120,15,68)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .attr('class', 'top-budget-rect' );

      // // Budget outlines
      // let top_budget_outline = compare_g.append("rect")
      //   .attr("x", 230)
      //   .attr("y", 10)
      //   .attr('width', 220)
      //   .attr('height', 10)
      //   .attr('fill', 'none')
      //   .attr('stroke', d3.hcl(0,0,60))
      //   .attr('stroke-width', 0)
      //   .attr('class', (d,i) => i === 0 ? 'top-budget-outline' : '')
      //   .attr('stroke-width', d => d.budget? .8 : 0)

       // Revenue and rate rects for top section
      let top_rate_rects = compare_g.append("rect")
        .attr("x",450)
        .attr("y", 5)
        .attr('width', d => 220 * (d.rating / rate_extent[1]))
        .attr('height', 10)
        .attr('fill', d3.hcl(60,15,68)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .attr('class','top-rate-rect');

      let top_rev_rects = compare_g.append("rect")
        .attr("x", 450)
        .attr("y", 15)
        .attr('width', d => 220 * (d.revenue / rev_extent[1]))
        .attr('height', 10)
        .attr('fill', d3.hcl(240,15,68)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .attr('class','top-rev-rect');

      // // Revenue and rate outlines
      //   let top_main_outline = compare_g.append("rect")
      //   .attr("x", 450)
      //   .attr("y", 5)
      //   .attr('width', 270)
      //   .attr('height', 20)
      //   .attr('fill', 'none').attr('stroke', d3.hcl(0,0,60))
      //   .attr('stroke-width', d => d.budget? .8 : 0)



  /*                                            END OF TOP SECTION                                        */

        // Divider line between top and bottom
       g.append("rect")
        .attr("y", 195)
        .attr("x", -45)
        .attr('width', plot_size+15)
        .attr('height', 0.5)
        .attr('fill', 'black').attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

  /*                                            BEGIN OF BOTTOM SECTION                                        */

      let bot_g = g.append("g")
        .attr('transform', d => `translate(0,${plot_size/3.4})`);

      // // Big outer outline rect for bot_g
      // let bot_rect = bot_g.append("rect")
      //   .attr('width', plot_size)
      //   .attr('height', plot_size*5/7)
      //   .attr('stroke', d3.hcl(0,0,60))
      //   .attr('stroke-width', .5)
      //   .attr('fill', 'none')

      // Group elements corresponding to each row
      let pixar_g = bot_g.selectAll("g")
        .data(pixar_data)
        .enter()
        .append("g")
        .attr('transform', d => `translate(0,${pixar_film_scale(d.title)})`)
        .attr('class', 'pixar_g_row');


      // Outline rects for each row
      pixar_g.append("rect")
        .attr('width', plot_size)
        .attr('height', 30)
        .attr('fill', 'none')
        .attr('class', 'pixar_g');

      // Labels for reach row
      pixar_g
        .append("text")
        .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
        .attr("x", 10)
        .attr("y", 20)
        .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .attr("font-family", "Merriweather")
        .attr("font-size", d => d.budget ? "16px" : "11px")
        .text((d,i) => (i+1).toString() + ". " + d.title);

      // Budget rects for bottom section
      let bot_budget = pixar_g.append("rect")
        .attr("x", d => 230 + 220 *(1 - (d.budget / budget_extent[1])))
        .attr("y", 10)
        .attr('width', d => 220 * (d.budget / budget_extent[1]))
        .attr('height', 10)
        .attr('fill', d3.hcl(120,15,68)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .attr('class','bot-budget-rect');

      // // Budget outlines
      // let bot_budget_outline = pixar_g.append("rect")
      //   .attr("x", 230)
      //   .attr("y", 10)
      //   .attr('width', 220)
      //   .attr('height', 10)
      //   .attr('fill', 'none')
      //   .attr('stroke', d3.hcl(0,0,60))
      //   .attr('stroke-width', d => d.budget? .8 : 0)

      // Revenue and rate rects for bottom section
      let bot_rate_rects = pixar_g.append("rect")
        .attr("x", 450)
        .attr("y", 5)
        .attr('width', d => 220 * (d.rating / rate_extent[1]))
        .attr('height', 10)
        .attr('fill', d3.hcl(60,15,68)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .attr('class','bot-rate-rect');

      let bot_rev_rects = pixar_g.append("rect")
        .attr("x", 450)
        .attr("y", 15)
        .attr('width', d => 220 * (d.revenue / rev_extent[1]))
        .attr('height', 10)
        .attr('fill', d3.hcl(240,15,68)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .attr('class','bot-rev-rect');

      // // Revenue and rate outlines
      //   let bot_main_outline = pixar_g.append("rect")
      //   .attr("x", 450)
      //   .attr("y", 5)
      //   .attr('width', 270)
      //   .attr('height', 20)
      //   .attr('fill', 'none').attr('stroke', d3.hcl(0,0,60))
      //   .attr('stroke-width', d => d.budget? .8 : 0)


/*                                            END OF BOTTOM SECTION                                        */

//                                            BEGIN OF LABELS SECTION

      // Budget label
      let budget_label = g.append("text")
        .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
        .attr("x", 310)
        .attr("y", -35)
        .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .text("Budget");

      // Budget legend
      g.append("rect")
        .attr("x", 370)
        .attr("y", -52)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d3.hcl(120,15,68)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

      // Group for revenue and ratings
      let rr_g = g.append("g")
        .attr('transform', d => `translate(470,-34)`);

      // Revenue label
      rr_g.append("text")
        .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
        .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .text("Revenue");

      // Rating label
      rr_g.append("text")
        .attr("x", 95)
        .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
        .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
        .text("Rating");

      // Revenue legend
      rr_g.append("rect")
        .attr("x", 70)
        .attr("y", -12)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d3.hcl(240,15,68)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

      // Rating legend
      rr_g.append("rect")
        .attr("x", 150)
        .attr("y", -12)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', d3.hcl(60,15,68)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);


//                                            END OF LABELS SECTION

//                                            BEGIN OF AXIS SECTION
        // Budget Axis
        let budget_axis = d3.axisTop().scale(budget_scale).ticks(5);

        let budget_axis_g = top_g.append("g");

        budget_axis_g.lower()
          .attr('transform', d => `translate(227,0)`)
          .attr('class', 'axis_top');

        budget_axis_g.call(budget_axis);

        // Revenue Axis
        let rr_axis = d3.axisTop().scale(rev_scale).ticks(5);

        let rev_axis_g = top_g.append("g");

        rev_axis_g.lower()
          .attr('transform', d => `translate(453,0)`)
          .attr('class', 'axis_top');

        rev_axis_g.call(rr_axis);

//                                            END OF AXIS SECTION

//                                            BEGIN OF SIDEBAR SECTION

      let sidebar = g.append("g")
        .attr('transform', d => `translate(720, 220)`)
        .attr('class','sidebar');


//                                            END OF SIDEBAR SECTION  


  // Applying Interactions
      hover_budget(g);
      hover_rr(g)


  }



  //                                           ERROR CHECKING

  else if (!pixar_data.length) {
    g.append("text")
    .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
    .attr("x", plot_size/2-150)
    .attr("y", plot_size/2)
    .attr("font-size", "20px")
    .text("No Pixar movie in time range. Please adjust slider.")
  }

  else  {
    g.append("text")
    .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
    .attr("x", plot_size/2-175)
    .attr("y", plot_size/2)
    .attr("font-size", "20px")
    .text("No Disney/DreamWorks movie in time range. Please adjust slider.")
  }

  return svg.node()


}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
# Interaction Implementation

`
)});
  main.variable(observer("hover_budget")).define("hover_budget", ["d3","compare_scale","budget_extent","plot_size","addWebFont","pixar_film_scale","dw_top","disney_top","dw_avg","disney_avg"], function(d3,compare_scale,budget_extent,plot_size,addWebFont,pixar_film_scale,dw_top,disney_top,dw_avg,disney_avg){return(
(g) => {

  // Budget Rects on top_g
   g.selectAll('.top-budget-rect').on('mouseover', function(d) {
     let budget = d.budget;

     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + compare_scale(d.title);

     // Vertical line for comparison
    g.append('rect')
      .attr('id','vert-line')
      .attr("x", 229 + 220 * (1 - (budget / budget_extent[1])) )
      .attr("y", 0)
      .attr('width', 0.25)
      .attr('height', plot_size+20)
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .6).attr('fill', d3.hcl(120,15,68));

     // Box for on-demand info
    g.append('rect')
      .attr('id','budget-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5)
      .attr('width', 85)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

     // Text for on-demand info
    g.append('text')
     .attr('id','text-inset')
     .attr("x", tx + 12)
     .attr("y", ty + 20)
     .text("Budget: " + budget)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

     // Select out movies with lower budget while on hover
     g.selectAll(".pixar_g").filter(item => item.budget < budget)
      .attr('fill', d3.hcl(73, 10, 92));

     // Side bar text
     g.selectAll('.sidebar').append("text")
    .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
    .attr("x", 10)
    // .attr("y", -35)
    .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
    .attr('font-size','11px')
    .text("Pixar movies with less budget")
    .attr('class','legends');

     // Side bar legend
     g.selectAll('.sidebar').append("rect")
    .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
    .attr("x", -15)
    .attr("y", -12)
    .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', d3.hcl(73, 10, 92))
     .attr('class','legends')


   });

  g.selectAll('.top-budget-rect').on('mousemove', function(d) {
     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + compare_scale(d.title);

    g.select('#budget-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5);

    g.select('#text-inset')
      .attr("x", tx + 12 )
      .attr("y", ty + 20)
  });

  g.selectAll('.top-budget-rect').on('mouseout', function(d)  {
    g.select('#vert-line').remove();
    g.select('#budget-inset').remove();
    g.select('#text-inset').remove();
    g.selectAll(".pixar_g").filter(item => item.budget < d.budget)
      .attr('fill', 'none');
    g.selectAll('.legends').remove()
  });


  // For budget rects of bottom sections
  g.selectAll('.bot-budget-rect').on('mouseover', function(d) {
     let budget = d.budget;

     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + pixar_film_scale(d.title);

     let sub_g = g.append('g')
                    .attr('transform', d => `translate(0,${plot_size/3.4})`);

     let vert_line_pos = 229 + 220 * (1 - (budget / budget_extent[1]));

    sub_g.append('rect')
      .attr('id','vert-line')
      .attr("x",  vert_line_pos)
      .attr("y", 0 - plot_size/3.4)
      .attr('width', 0.25)
      .attr('height', plot_size+20)
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .6).attr('fill', d3.hcl(120,15,68));

    sub_g.append('rect')
      .attr('id','budget-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5)
      .attr('width', 85)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    sub_g.append('text')
     .attr('id','text-inset')
     .attr("x", tx + 12)
     .attr("y", ty + 20)
     .text("Budget: " + budget)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    let dw_top_diff = 220* Math.abs(budget - dw_top.budget)/budget_extent[1];
    let disney_top_diff = 220*Math.abs(budget - disney_top.budget)/budget_extent[1];
    let dw_avg_diff =220* Math.abs(budget - dw_avg.budget)/budget_extent[1];
    let disney_avg_diff =220* Math.abs(budget - disney_avg.budget)/budget_extent[1];

    // light squares for comparison
    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", budget > dw_top.budget ? vert_line_pos : vert_line_pos - dw_top_diff)
    .attr("y", 10)
    .attr('width', dw_top_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(120,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", budget > disney_top.budget ? vert_line_pos : vert_line_pos - disney_top_diff)
    .attr("y", 61)
    .attr('width', disney_top_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(120,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", budget > dw_avg.budget ? vert_line_pos : vert_line_pos - dw_avg_diff)
    .attr("y", 111.5)
    .attr('width', dw_avg_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(120,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", budget > disney_avg.budget ? vert_line_pos : vert_line_pos - disney_avg_diff)
    .attr("y", 162.5)
    .attr('width', disney_avg_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(120,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    // comparison texts and surrounding rects
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 450 )
      .attr("y", 10)
      .attr('width', 110)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio1 = ( Math.abs(budget - dw_top.budget)/ budget * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 455)
     .attr("y", 25)
     .text(budget > dw_top.budget ? ratio1 + "% less budget" : ratio1 + "% more budget")
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    // --------2
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 450 )
      .attr("y", 61)
      .attr('width', 110)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio2 = ( Math.abs(budget - disney_top.budget)/ budget * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 455)
     .attr("y", 76)
     .text(budget > disney_top.budget ? ratio2 + "% less budget" : ratio2 + "% more budget")
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    // --------3
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 450 )
      .attr("y", 111.5)
      .attr('width', 110)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio3 = ( Math.abs(budget - dw_avg.budget)/ budget * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 455)
     .attr("y", 126.5)
     .text(budget > dw_avg.budget ? ratio3 + "% less budget" : ratio3 + "% more budget")
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    // --------4
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 450 )
      .attr("y", 162.5)
      .attr('width', 110)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio4 = ( Math.abs(budget - disney_avg.budget)/ budget * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 455)
     .attr("y", 177.5)
     .text(budget > disney_avg.budget ? ratio4 + "% less budget" : ratio4 + "% more budget")
     .attr("font-size", "12px")
     .attr("font-weight", "italic")

   });

  g.selectAll('.bot-budget-rect').on('mousemove', function(d) {
     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + pixar_film_scale(d.title);

    g.select('#budget-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5);

    g.select('#text-inset')
      .attr("x", tx + 12 )
      .attr("y", ty + 20)
  });

  g.selectAll('.bot-budget-rect').on('mouseout', function(d)  {
    g.select('#vert-line').remove();
    g.select('#budget-inset').remove();
    g.select('#text-inset').remove();
    g.selectAll(".hover_compare").remove();
    g.selectAll(".text_compare").remove();
    g.selectAll(".text-compare-rect").remove()
  })
}
)});
  main.variable(observer("hover_rr")).define("hover_rr", ["d3","compare_scale","rate_extent","plot_size","addWebFont","rev_extent","pixar_film_scale","dw_top","disney_top","dw_avg","disney_avg"], function(d3,compare_scale,rate_extent,plot_size,addWebFont,rev_extent,pixar_film_scale,dw_top,disney_top,dw_avg,disney_avg){return(
(g) => {
  //  Rating rects on top
 g.selectAll('.top-rate-rect').on('mouseover', function(d) {
     let rating = d.rating;
     let rev = d.revenue;

     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + compare_scale(d.title);

    g.append('rect')
      .attr('id','vert-line')
      .attr("x", 451 + 220 * (rating / rate_extent[1]) )
      .attr("y", 1)
      .attr('width', 0.25)
      .attr('height', plot_size+25)
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .6).attr('fill', d3.hcl(60,15,68));

    g.append('rect')
      .attr('id','rr-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5)
      .attr('width', 95)
      .attr('height', 35)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    g.append('text')
     .attr('id','text-inset1')
     .attr("x", tx + 12)
     .attr("y", ty + 18)
     .text("Rating: " + rating)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

   g.append('text')
     .attr('id','text-inset2')
     .attr("x", tx + 12)
     .attr("y", ty + 33)
     .text("Revenue: " + rev)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

   g.selectAll(".pixar_g").filter(item => item.rating > rating)
      .attr('fill', d3.hcl(73, 10, 92));

     g.selectAll('.sidebar').append("text")
    .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
    .attr("x", 10)
    // .attr("y", -35)
    .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
    .attr('font-size','11px')
    .text("Pixar movies with higher rating")
    .attr('class','legends');

     g.selectAll('.sidebar').append("rect")
    .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
    .attr("x", -15)
    .attr("y", -12)
    .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', d3.hcl(73, 10, 92))
     .attr('class','legends')


   });

  g.selectAll('.top-rate-rect').on('mousemove', function(d) {
     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + compare_scale(d.title);

    g.select('#rr-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5);

    g.select('#text-inset1')
      .attr("x", tx + 12 )
      .attr("y", ty + 18);

    g.select('#text-inset2')
      .attr("x", tx + 12 )
      .attr("y", ty + 33)
  });

  g.selectAll('.top-rate-rect').on('mouseout', function(d)  {
    g.select('#vert-line').remove();
    g.select('#rr-inset').remove();
    g.select('#text-inset1').remove();
    g.select('#text-inset2').remove();

    g.selectAll(".pixar_g").filter(item => item.rating > d.rating)
      .attr('fill', 'none');
    g.selectAll('.legends').remove()
  });


  // Revenue rects for top
  g.selectAll('.top-rev-rect').on('mouseover', function(d) {
     let rev = d.revenue;
     let rating = d.rating;

     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + compare_scale(d.title);

    g.append('rect')
      .attr('id','vert-line')
      .attr("x", 451 + 220 * (rev / rev_extent[1]) )
      .attr("y", 1)
      .attr('width', 0.25)
      .attr('height', plot_size+25)
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .6).attr('fill', d3.hcl(240,15,68));

    g.append('rect')
      .attr('id','rr-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5)
      .attr('width', 95)
      .attr('height', 35)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    g.append('text')
     .attr('id','text-inset1')
     .attr("x", tx + 12)
     .attr("y", ty + 18)
     .text("Rating: " + rating)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

   g.append('text')
     .attr('id','text-inset2')
     .attr("x", tx + 12)
     .attr("y", ty + 33)
     .text("Revenue: " + rev)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    g.selectAll(".pixar_g").filter(item => item.revenue > rev)
      .attr('fill', d3.hcl(73, 10, 92));

     g.selectAll('.sidebar').append("text")
    .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
    .attr("x", 10)
    // .attr("y", -35)
    .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
    .attr('font-size','11px')
    .text("Pixar movies with higher revenue")
    .attr('class','legends');

     g.selectAll('.sidebar').append("rect")
    .call(addWebFont, 'Merriweather', 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap')
    .attr("x", -15)
    .attr("y", -12)
    .attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', d3.hcl(73, 10, 92))
     .attr('class','legends')


   });

  g.selectAll('.top-rev-rect').on('mousemove', function(d) {
     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + compare_scale(d.title);

    g.select('#rr-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5);

    g.select('#text-inset1')
      .attr("x", tx + 12 )
      .attr("y", ty + 18);

    g.select('#text-inset2')
      .attr("x", tx + 12 )
      .attr("y", ty + 33)

  });

  g.selectAll('.top-rev-rect').on('mouseout', function(d)  {
    g.select('#vert-line').remove();
    g.select('#rr-inset').remove();
    g.select('#text-inset1').remove();
    g.select('#text-inset2').remove();

    g.selectAll(".pixar_g").filter(item => item.revenue > d.revenue)
      .attr('fill', 'none');
    g.selectAll('.legends').remove()
  });

  // Rating rects for bottom
  g.selectAll('.bot-rate-rect').on('mouseover', function(d) {
     let rating = d.rating;
     let rev = d.revenue;

     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + pixar_film_scale(d.title);

    let sub_g = g.append('g')
                    .attr('transform', d => `translate(0,${plot_size/3.4})`);

    let vert_line_pos = 451 + 220 * (rating / rate_extent[1]);

    sub_g.append('rect')
      .attr('id','vert-line')
      .attr("x",  vert_line_pos)
      .attr("y", 1 - plot_size/3.4)
      .attr('width', 0.25)
      .attr('height', plot_size+25)
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .6).attr('fill', d3.hcl(60,15,68));

    sub_g.append('rect')
      .attr('id','rr-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5)
      .attr('width', 95)
      .attr('height', 35)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    sub_g.append('text')
     .attr('id','text-inset1')
     .attr("x", tx + 12)
     .attr("y", ty + 18)
     .text("Rating: " + rating)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

   sub_g.append('text')
     .attr('id','text-inset2')
     .attr("x", tx + 12)
     .attr("y", ty + 33)
     .text("Revenue: " + rev)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    let dw_top_rate_diff = 220* Math.abs(rating - dw_top.rating)/rate_extent[1];
    let disney_top_rate_diff = 220*Math.abs(rating - disney_top.rating)/rate_extent[1];
    let dw_avg_rate_diff =220* Math.abs(rating - dw_avg.rating)/rate_extent[1];
    let disney_avg_rate_diff =220* Math.abs(rating - disney_avg.rating)/rate_extent[1];

    // light squares for comparison
    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", rating > dw_top.rating ?  vert_line_pos - dw_top_rate_diff : vert_line_pos)
    .attr("y", 5)
    .attr('width', dw_top_rate_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(60,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", rating > disney_top.rating ?  vert_line_pos - disney_top_rate_diff : vert_line_pos)
    .attr("y", 55.5)
    .attr('width', disney_top_rate_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(60,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", rating > dw_avg.rating ? vert_line_pos - dw_avg_rate_diff : vert_line_pos)
    .attr("y", 106.5)
    .attr('width', dw_avg_rate_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(60,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", rating > disney_avg.rating ?  vert_line_pos - disney_avg_rate_diff : vert_line_pos)
    .attr("y", 157)
    .attr('width', disney_avg_rate_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(60,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    // comparison texts and surrounding rects
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 315 )
      .attr("y", 5)
      .attr('width', 135)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio1 = ( Math.abs(rating - dw_top.rating)/ rating * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 320)
     .attr("y", 20)
     .text(rating > dw_top.rating ? "Lower rating: " +dw_top.rating +" vs " +rating
           : "Higher rating: " +dw_top.rating +" vs " +rating)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    // --------2
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 315 )
      .attr("y", 55.5)
      .attr('width', 135)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio2 = ( Math.abs(rating - disney_top.rating)/ rating * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 320)
     .attr("y", 70.5)
     .text(rating > disney_top.rating ? "Lower rating: " +disney_top.rating +" vs " +rating
           : "Higher rating: " +disney_top.rating +" vs " +rating)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    // --------3
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 315 )
      .attr("y", 106.5)
      .attr('width', 135)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio3 = ( Math.abs(rating - dw_avg.rating)/ rating * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 320)
     .attr("y", 121.5)
     .text(rating > dw_avg.rating ? "Lower rating: " +dw_avg.rating +" vs " +rating
           : "Higher rating: " +dw_avg.rating +" vs " +rating)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    // --------4
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 315 )
      .attr("y", 157)
      .attr('width', 135)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio4 = ( Math.abs(rating - disney_avg.rating)/ rating * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 320)
     .attr("y", 172)
     .text(rating > disney_avg.rating ? "Lower rating: " +disney_avg.rating +" vs " +rating
           : "Higher rating: " +disney_avg.rating +" vs " +rating)
     .attr("font-size", "12px")
     .attr("font-weight", "italic")

   });

  g.selectAll('.bot-rate-rect').on('mousemove', function(d) {
     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + pixar_film_scale(d.title);

    g.select('#rr-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5);

    g.select('#text-inset1')
      .attr("x", tx + 12 )
      .attr("y", ty + 18);

    g.select('#text-inset2')
      .attr("x", tx + 12 )
      .attr("y", ty + 33)
  });


  g.selectAll('.bot-rate-rect').on('mouseout', function(d)  {
    g.select('#vert-line').remove();
    g.select('#rr-inset').remove();
    g.select('#text-inset1').remove();
    g.select('#text-inset2').remove();
    g.selectAll(".hover_compare").remove();
    g.selectAll(".text_compare").remove();
    g.selectAll(".text-compare-rect").remove()
  });


  // Revenue rects for bottom
  g.selectAll('.bot-rev-rect').on('mouseover', function(d) {
     let rev = d.revenue;
     let rating = d.rating;

     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + pixar_film_scale(d.title);

    let sub_g = g.append('g')
                    .attr('transform', d => `translate(0,${plot_size/3.4})`);
    let vert_line_pos = 451 + 220 * (rev / rev_extent[1]);

    sub_g.append('rect')
      .attr('id','vert-line')
      .attr("x", vert_line_pos )
      .attr("y", 1 - plot_size/3.4)
      .attr('width', 0.25)
      .attr('height', plot_size+25)
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .6).attr('fill', d3.hcl(240,15,68));

    sub_g.append('rect')
      .attr('id','rr-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5)
      .attr('width', 95)
      .attr('height', 35)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    sub_g.append('text')
     .attr('id','text-inset1')
     .attr("x", tx + 12)
     .attr("y", ty + 18)
     .text("Rating: " + rating)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

   sub_g.append('text')
     .attr('id','text-inset2')
     .attr("x", tx + 12)
     .attr("y", ty + 33)
     .text("Revenue: " + rev)
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    let dw_top_rev_diff = 220* Math.abs(rev - dw_top.revenue)/rev_extent[1];
    let disney_top_rev_diff = 220*Math.abs(rev - disney_top.revenue)/rev_extent[1];
    let dw_avg_rev_diff =220* Math.abs(rev - dw_avg.revenue)/rev_extent[1];
    let disney_avg_rev_diff =220* Math.abs(rev - disney_avg.revenue)/rev_extent[1];

    // light squares for comparison
    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", rev > dw_top.revenue ?  vert_line_pos - dw_top_rev_diff : vert_line_pos)
    .attr("y", 15)
    .attr('width', dw_top_rev_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(240,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", rev > disney_top.revenue ?  vert_line_pos - disney_top_rev_diff : vert_line_pos)
    .attr("y", 65.5)
    .attr('width', disney_top_rev_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(240,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", rev > dw_avg.revenue ? vert_line_pos - dw_avg_rev_diff : vert_line_pos)
    .attr("y", 116.5)
    .attr('width', dw_avg_rev_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(240,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    g.append('rect')
    .attr("class","hover_compare")
    .attr("x", rev > disney_avg.revenue ?  vert_line_pos - disney_avg_rev_diff : vert_line_pos)
    .attr("y", 167)
    .attr('width', disney_avg_rev_diff )
    .attr('height', 10)
    .attr('fill', d3.hcl(240,15,95)).attr('stroke', d3.hcl(0,0,60)).attr('stroke-width', .8);

    // comparison texts and surrounding rects
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 330 )
      .attr("y", 5)
      .attr('width', 125)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio1 = ( Math.abs(rev - dw_top.revenue)/ rev * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 335)
     .attr("y", 20)
     .text(rev > dw_top.revenue ? ratio1 + "% less revenue" : ratio1 + "% more revenue")
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    // --------2
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 330 )
      .attr("y", 55.5)
      .attr('width', 125)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio2 = ( Math.abs(rev - disney_top.revenue)/ rev * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 335)
     .attr("y", 70.5)
     .text(rev > disney_top.revenue ? ratio2 + "% less revenue" : ratio2 + "% more revenue")
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    // --------3
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 330 )
      .attr("y", 106.5)
      .attr('width', 125)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio3 = ( Math.abs(rev - dw_avg.revenue)/ rev * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 335)
     .attr("y", 121.5)
     .text(rev > dw_avg.revenue ? ratio3 + "% less revenue" : ratio3 + "% more revenue")
     .attr("font-size", "12px")
     .attr("font-weight", "italic");

    // --------4
    g.append('rect')
      .attr('class','text-compare-rect')
      .attr("x", 330 )
      .attr("y", 157)
      .attr('width', 125)
      .attr('height', 25)
      .attr('fill', d3.hcl(200,20,65))
      .attr('stroke', d3.hcl(0,0,40)).attr('stroke-width', .7).attr('fill', d3.hcl(0,0,95));

    let ratio4 = ( Math.abs(rev - disney_avg.revenue)/ rev * 100) .toFixed(1);
    g.append('text')
     .attr('class','text_compare')
     .attr("x", 335)
     .attr("y", 172)
     .text(rev > disney_avg.revenue ? ratio4 + "% less revenue" : ratio4 + "% more revenue")
     .attr("font-size", "12px")
     .attr("font-weight", "italic")

   });

  g.selectAll('.bot-rev-rect').on('mousemove', function(d) {
     let mouse_cursor = d3.mouse(this);
     let tx = mouse_cursor[0];
     let ty = mouse_cursor[1] + pixar_film_scale(d.title);

    g.select('#rr-inset')
      .attr("x", tx + 5 )
      .attr("y", ty + 5);

    g.select('#text-inset1')
      .attr("x", tx + 12 )
      .attr("y", ty + 18);

    g.select('#text-inset2')
      .attr("x", tx + 12 )
      .attr("y", ty + 33)
  });

  g.selectAll('.bot-rev-rect').on('mouseout', function(d)  {
    g.select('#vert-line').remove();
    g.select('#rr-inset').remove();
    g.select('#text-inset1').remove();
    g.select('#text-inset2').remove();
    g.selectAll(".hover_compare").remove();
    g.selectAll(".text_compare").remove();
    g.selectAll(".text-compare-rect").remove()
  })

 }
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
# Film lists

`
)});
  main.variable(observer("pixar_films")).define("pixar_films", ["pixar_data"], function(pixar_data)
{
  let arr = [];
  for (let film of pixar_data) {
    arr.push(film.title)
  }
  return arr
}
);
  main.variable(observer("disney_films")).define("disney_films", ["disney_data"], function(disney_data)
{
  let arr = [];
  for (let film of disney_data) {
    arr.push(film.title)
  }
  return arr
}
);
  main.variable(observer("dw_films")).define("dw_films", ["dw_data"], function(dw_data)
{
  let arr = [];
  for (let film of dw_data) {
    arr.push(film.title)
  }
  return arr
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
# Extents

`
)});
  main.variable(observer("budget_extent")).define("budget_extent", ["d3","all_data"], function(d3,all_data){return(
d3.extent(all_data, d => d.budget)
)});
  main.variable(observer("rev_extent")).define("rev_extent", ["d3","all_data"], function(d3,all_data){return(
d3.extent(all_data, d => d.revenue)
)});
  main.variable(observer("rate_extent")).define("rate_extent", ["d3","all_data"], function(d3,all_data){return(
d3.extent(all_data, d => d.rating)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Scales

`
)});
  main.variable(observer("compare_scale")).define("compare_scale", ["d3","compare_arr","plot_size"], function(d3,compare_arr,plot_size){return(
d3.scaleBand()
  .domain(compare_arr.map(d => d.title))
  .range([0, plot_size/4])
  .paddingInner(0.1)
)});
  main.variable(observer("pixar_film_scale")).define("pixar_film_scale", ["d3","pixar_films","plot_size","num_films"], function(d3,pixar_films,plot_size,num_films){return(
d3.scaleBand()
  .domain(pixar_films)
  .range([0, plot_size*3/64 * num_films])
  .paddingInner(0.1)
)});
  main.variable(observer("budget_scale")).define("budget_scale", ["d3","budget_extent"], function(d3,budget_extent){return(
d3.scaleLinear()
  .domain(budget_extent)
  .range([220, 0])
)});
  main.variable(observer("rev_scale")).define("rev_scale", ["d3","rev_extent"], function(d3,rev_extent){return(
d3.scaleLinear()
  .domain(rev_extent)
  .range([0, 220])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
# Processed Data

`
)});
  main.variable(observer("trimmed_pixar")).define("trimmed_pixar", ["pixar_json","parseTime","year_threshold"], function(pixar_json,parseTime,year_threshold)
{

  let res = [];
  for (let item of pixar_json) {
    let year = parseTime(item.release_date).getFullYear();
    if (year <= year_threshold[1] && year >= year_threshold[0]) {
      res.push(item)
    }
  }
  return res
}
);
  main.variable(observer("pixar_data")).define("pixar_data", ["trimmed_pixar","order","parseTime"], function(trimmed_pixar,order,parseTime)
{
   let res = trimmed_pixar;
  switch (order) {

    case "Alphabetically": res.sort((a, b) => a.title.localeCompare(b.title)); break;
    case "Chronologically": res.sort((a, b) => parseTime(a.release_date) - parseTime(b.release_date) ); break;
    case "Reverse-Chronologically": res.sort((a, b) => parseTime(b.release_date) - parseTime(a.release_date) ); break;
    case "Ascending Budget": res.sort((a, b) => a.budget - b.budget); break;
    case "Descending Budget": res.sort((a, b) => b.budget - a.budget); break;
    case "Ascending Revenue": res.sort((a, b) => a.revenue - b.revenue); break;
    case "Descending Revenue": res.sort((a, b) => b.revenue - a.revenue); break;
    case "Ascending Rating": res.sort((a, b) => a.rating - b.rating); break;
    case "Descending Rating": res.sort((a, b) => b.rating - a.rating); break;
  }

  return res;
}
);
  main.variable(observer("disney_data")).define("disney_data", ["disney_json","parseTime","year_threshold"], function(disney_json,parseTime,year_threshold)
{

  let res = [];
  for (let item of disney_json) {
    let year = parseTime(item.date_published).getFullYear();
    if (year <= year_threshold[1] && year >= year_threshold[0]) {
      res.push(item)
    }
  }
  return res
}
);
  main.variable(observer("disney_avg")).define("disney_avg", ["disney_data"], function(disney_data)
{
  let budget = 0, revenue = 0, rating = 0;
  for (let item of disney_data) {
    budget += item.budget;
    revenue += item.revenue;
    rating += item.rating
  }
  let len = disney_data.length;
  budget /= len;
  revenue /= len;
  rating /= len;
  return {
    "rating": rating.toFixed(1),
    "revenue": revenue.toFixed(1),
    "budget": budget.toFixed(1),
    "title": "Disney Average"
  }
}
);
  main.variable(observer("disney_top")).define("disney_top", ["disney_data"], function(disney_data)
{
 if (disney_data.length) {
  return disney_data.reduce(function(a,b) {
    return a.revenue > b.revenue ? a : b
  })
 }
 else return {}

}
);
  main.variable(observer("dw_data")).define("dw_data", ["dw_json","parseTime","year_threshold"], function(dw_json,parseTime,year_threshold)
{

  let res = [];
  for (let item of dw_json) {
    let year = parseTime(item.release_date).getFullYear();
    if (year <= year_threshold[1] && year >= year_threshold[0]) {
      res.push(item)
    }
  }
  return res
}
);
  main.variable(observer("dw_avg")).define("dw_avg", ["dw_data"], function(dw_data)
{
    if (!dw_data.length) return {
        "rating": 0,
        "revenue": 0,
        "budget": 0,
        "title": "DreamWorks Average"
    }

  let budget = 0, revenue = 0, rating = 0;
  for (let item of dw_data) {
    budget += item.budget;
    revenue += item.revenue;
    rating += item.rating
  }
  let len = dw_data.length;
  budget /= len;
  revenue /= len;
  rating /= len;
  return {
    "rating": rating.toFixed(1),
    "revenue": revenue.toFixed(1),
    "budget": budget.toFixed(1),
    "title": "DreamWorks Average"
  }
}
);
    main.variable(observer("dw_top")).define("dw_top", ["dw_data"], function(dw_data)
        {
            if (dw_data.length) {
                return dw_data.reduce(function(a,b) {
                    return a.revenue > b.revenue ? a : b
                })
            }
            else return {
                "rating": 0,
                "revenue": 0,
                "budget": 0,
                "title": "None"
            }

        }
    );
  main.variable(observer("compare_arr")).define("compare_arr", ["dw_top","disney_top","dw_avg","disney_avg"], function(dw_top,disney_top,dw_avg,disney_avg)
{
  let blank_label = {"title" : " "};
  let disney_top_label = {"title": "Disney top film in time range"};
  let dw_top_label = {"title": "DreamWorks top film in time range"};
  return [dw_top, dw_top_label, disney_top, disney_top_label, dw_avg, blank_label, disney_avg ]

}
);
  main.variable(observer("all_data")).define("all_data", ["disney_avg","dw_avg","disney_top","dw_top","pixar_data"], function(disney_avg,dw_avg,disney_top,dw_top,pixar_data)
{
  let arr = [];
  arr.push(disney_avg);
  arr.push(dw_avg);
  arr.push(disney_top);
  arr.push(dw_top);
  for (let item of pixar_data) {
    arr.push(item)
  }
  return arr
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
# Raw Data

`
)});
  main.variable(observer("pixar_json")).define("pixar_json", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("pixar@1.json").json()
)});
  main.variable(observer("disney_json")).define("disney_json", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("disney.json").json()
)});
  main.variable(observer("dw_json")).define("dw_json", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("dreamworks.json").json()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
# Constants

`
)});
  main.variable(observer("parseTime")).define("parseTime", ["d3"], function(d3){return(
d3.timeParse("%M/%d/%Y")
)});
  main.variable(observer("height")).define("height", function(){return(
800
)});
  main.variable(observer("width")).define("width", function(){return(
1200
)});
  main.variable(observer("plot_size")).define("plot_size", ["height","pad"], function(height,pad){return(
height-2*pad
)});
  main.variable(observer("pad")).define("pad", function(){return(
50
)});
  main.variable(observer("num_films")).define("num_films", ["pixar_data"], function(pixar_data){return(
pixar_data.length
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
# Imports

`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  const child1 = runtime.module(define1);
  main.import("rangeSlider", child1);
  const child2 = runtime.module(define2);
  main.import("addWebFont", child2);
  const child3 = runtime.module(define3);
  main.import("select", child3);
  const child4 = runtime.module(define4);
  main.import("drawdom", child4);
  main.import("drawjoin", child4);
  return main;
}
