export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# drawDOM`
)});
  main.variable(observer("drawdom")).define("drawdom", ["d3","width"], function(d3,width){return(
(root_dom,max_nodes) => {
  // adapted from https://observablehq.com/@d3/d3-hierarchy
  
  let extract_attributes = (node_atts) => {
    let attributes = [];
    for(let adx = 0; adx < node_atts.length; adx++) {
      let next_attribute = node_atts[adx];
      attributes.push({name:next_attribute.name,value:next_attribute.value})
    }
    return attributes
  };
  
  let root_d = null;
  d3.select(root_dom).each(d => { root_d = d });

  let root_node = [root_dom,{tag:root_dom.tagName,attributes:extract_attributes(root_dom.attributes),d:root_d}];
  let node_queue = [root_node];
  while(node_queue.length > 0) {
    let cur_node = node_queue.pop(), n_nodes = 0;
    d3.select(cur_node[0]).selectAll('*').each(function(d) {
      if(this.parentNode==cur_node[0]) {
        if(!('children' in cur_node[1]))
          cur_node[1].children = [];
        if(!max_nodes || (max_nodes && n_nodes < max_nodes)) {
          let new_node = [this,{tag:this.tagName,attributes:extract_attributes(this.attributes),d:d}];
          cur_node[1].children.push(new_node[1]);
          node_queue.push(new_node);
          n_nodes+=1
        }
      }
    })
  }
  
  let dom_hierarchy = d3.hierarchy(root_node[1]);
  
  let x_size = 12, y_size = 100, marginLeft = 40;
  let tree = d3.tree().nodeSize([x_size,y_size]);
  let root = tree(dom_hierarchy);
  
  let treeLink = d3.linkHorizontal().x(d => d.y).y(d => d.x);
  
  let x0 = Infinity, x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });
  let x_exts = [x0,x1];

  let svg = d3.create('svg').attr('width', width).attr('height', (x_exts[1]-x_exts[0]+2*x_size));
  let svg_node = svg.node();
  
  let g = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', `translate(${marginLeft},${x_size - x_exts[0]})`);
    
  let link = g.append('g')
    .attr('fill', 'none')
    .attr('stroke', d3.hcl(0,0,60))
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
  .selectAll("path")
    .data(root.links())
    .join('path')
      .attr('d', treeLink);
  
  const node = g.append('g')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
  .selectAll('g')
    .data(root.descendants())
    .join('g')
      .attr('transform', d => `translate(${d.y},${d.x})`);

  node.append('circle')
    .attr('fill', d => d.children ? d3.hcl(0,0,20) : d3.hcl(0,0,60))
    .attr('r', 3.6);
  
  node.selectAll('circle').on('click', function(d) {
    node.selectAll('circle').attr('fill', d => d.children ? d3.hcl(0,0,20) : d3.hcl(0,0,60));
    d3.select(this).attr('fill', d3.hcl(320,65,65));
    svg_node.value = {d:d.data.d, attributes:d.data.attributes};
    svg_node.dispatchEvent(new CustomEvent('input'))
  });
  
  node.append('text')
    .attr('dy', '0.31em')
    .attr('x', d => d.children ? -6 : 6)
    .attr('text-anchor', d => d.children ? 'end' : 'start')
    .text(d => d.data.tag)
    .style('fill', d3.hcl(0,0,40))
    .clone(true).lower()
      .attr('stroke', 'white');
  
  svg_node.value = 'Nothing to see here!';
  svg_node.dispatchEvent(new CustomEvent('input'));
  
  return svg.node();
}
)});
  main.variable(observer("dj")).define("dj", ["d3","width"], function(d3,width)
{
  let rand_data = d3.range(10).map(_ => Math.random());
  let svg = d3.create('svg').attr('width', width).attr('height', 100);
  
  return svg.append('g').selectAll('blah').data(rand_data)
}
);
  main.variable(observer("viewof scatterplot_vis")).define("viewof scatterplot_vis", ["drawjoin","dj"], function(drawjoin,dj){return(
drawjoin(dj)
)});
  main.variable(observer("scatterplot_vis")).define("scatterplot_vis", ["Generators", "viewof scatterplot_vis"], (G, _) => G.input(_));
  main.variable(observer()).define(["scatterplot_vis"], function(scatterplot_vis){return(
scatterplot_vis
)});
  main.variable(observer("drawjoin")).define("drawjoin", ["d3","width"], function(d3,width){return(
(data_join,max_nodes) => {
  let extract_attributes = (node_atts) => {
    let attributes = [];
    for(let adx = 0; adx < node_atts.length; adx++) {
      let next_attribute = node_atts[adx];
      attributes.push({name:next_attribute.name,value:next_attribute.value})
    }
    return attributes
  };
  
  let graphs = [{type:'update',name:'Update Selection',selection:data_join._groups},
                {type:'enter',name:'Enter Selection',selection:data_join._enter},
                {type:'exit',name:'Exit Selection',selection:data_join._exit}];
  
  let parents = data_join._parents;
  let end_y = 8;
  
  let svg = d3.create('svg').attr('width', width);//.attr('height', (x_exts[1]-x_exts[0]+2*x_size))
  let svg_node = svg.node();
  
  for(let g = 0; g < graphs.length; g++) {
    let dummy_root_node = {tag:'dummy',attributes:[],d:null};
    dummy_root_node.children = [];
    
    let graph_type = graphs[g].type, groups = graphs[g].selection, selection_name = graphs[g].name;
    for(let gdx = 0; gdx < parents.length; gdx++) {
      let group = groups[gdx];
      let parent = parents[gdx];
      
      let parent_node = {tag:parent.tagName,attributes:extract_attributes(parent.attributes),d:parent.__data__};
      for(let idx = 0; idx < group.length; idx++) {
        if(group[idx]) {
          let name = graph_type=='enter' ? 'enter' : group[idx].tagName;
          let attributes = graph_type=='enter' ? [] : extract_attributes(group[idx].attributes);
          let group_node = {tag:name,attributes:attributes,d:group[idx].__data__};

          if(!('children' in parent_node))
            parent_node.children = [];
          if(!max_nodes || (max_nodes && idx < max_nodes))
            parent_node.children.push(group_node)
        }
      }
      dummy_root_node.children.push(parent_node)
    }
    
    let selection_hierarchy = d3.hierarchy(dummy_root_node);
    let x_size = 12, y_size = 100, marginLeft = 40;
    let tree = d3.tree().nodeSize([x_size,y_size]);
    let root = tree(selection_hierarchy);

    let treeLink = d3.linkHorizontal().x(d => d.y).y(d => d.x);

    let x0 = Infinity, x1 = -x0;
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });
    let x_exts = [x0,x1];

    let graph_g = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('transform', `translate(${marginLeft},${end_y+x_size - x_exts[0]})`);

    let link = graph_g.append('g')
      .attr('fill', 'none')
      .attr('stroke', d3.hcl(0,0,60))
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
     .selectAll("path")
     .data(root.links())
     .join('path')
      .attr('d', treeLink);
    
    // remove dummy links
    link.filter(d => d.source.depth==0 && d.target.depth==1).remove();
    
    const node = graph_g.append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
     .selectAll('g')
     .data(root.descendants())
     .join('g')
      .attr('transform', d => { console.log('d?',d); return `translate(${d.y},${d.x})` });

    node.append('circle')
      .attr('fill', d => d.children ? d3.hcl(0,0,20) : d3.hcl(0,0,60))
      .attr('r', 3.6);
    
    // remove dummy circles
    node.selectAll('circle').filter(d => d.depth==0).remove();

    node.selectAll('circle').on('click', function(d) {
      svg.selectAll('circle').attr('fill', d => d.children ? d3.hcl(0,0,20) : d3.hcl(0,0,60));
      d3.select(this).attr('fill', d3.hcl(320,65,65));
      svg_node.value = {d:d.data.d, attributes:d.data.attributes};
      svg_node.dispatchEvent(new CustomEvent('input'))
    });

    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -6 : 6)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.tag)
      .style('fill', d3.hcl(0,0,40))
      .clone(true).lower()
      .attr('stroke', 'white');
    
    node.selectAll('text').filter(d => d.depth==0)
      .text(selection_name)
      .attr('text-anchor', 'start').attr('dy', '0.35em');
    
    let max_y = 0;
    node.each(node_datum => { max_y = Math.max(max_y,node_datum.x+5); });
    end_y+=(14+x_size+(x_exts[1]-x_exts[0]))
  }
  svg.attr('height', end_y);
  
  svg_node.value = 'Nothing to see here!';
  svg_node.dispatchEvent(new CustomEvent('input'));
  
  return svg_node
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
