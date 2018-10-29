$(document).ready(function() {
    // This WILL work because we are listening on the 'document',
    // for a click on an element with an ID of #test-element


    $.ajax({
      url:"recogerdatos.php",
      type:'GET',
      success:function(json)
      {
        var a=$.parseJSON(json);
        var ciudad=$('#selectCiudad');
        var tipo=$('#selectTipo');
        var templateopcion='<option value=":ciudad1:">:ciudad:</option>'
        var tipos=new Array();
        var ciudades=new Array();
        for(var i=0;i<a.length;i++)
        {
          if(tipos.indexOf(a[i].Tipo.toString())== -1)
          {
            tipo.append(templateopcion.replace(":ciudad1:",a[i].Tipo.toString())
                                      .replace(":ciudad:",a[i].Tipo.toString()))
            tipos.push(a[i].Tipo.toString());
          }
          if(ciudades.indexOf(a[i].Ciudad.toString())== -1)
          {
            ciudad.append(templateopcion.replace(":ciudad1:",a[i].Ciudad.toString())
                                      .replace(":ciudad:",a[i].Ciudad.toString()))
            ciudades.push(a[i].Ciudad.toString())
          }
        }
            $('select').material_select();
      }
    });
    $(document).on("click","#submitButton",function(event){
      event.preventDefault();
      $('#cont').empty()
      var etipo=$('select[name=tipo]').val();
      var eciudad=$('select[name=ciudad]').val();
      var precio=$('#rangoPrecio').val();
      var preciomenor=parseFloat(precio.substring(0,precio.indexOf(";")));
      var preciosuperior=parseFloat(precio.substring(precio.indexOf(";")+1,precio.length));
      $.ajax({
        url:"recogerdatos.php",
        type:"GET",
        success:function(json)
        {
          var a=$.parseJSON(json);
          var padre=$('#cont')

          var templatecard='<div class="card-panel grey lighten-5 z-depth-1">'+
          '<div class="row valign-wrapper">'+
          '<div class="col m5">'+
          '<img src="img/home.jpg" alt="hogar" class="responsive-img">'+
          '</div>'+
          '<div class="col m7">'+
          '<p>Direccion::direccion:</p>'+
          '<p>Ciudad::ciudad:</p>'+
          '<p>Telefono::telefono:</p>'+
          '<p>Codigo Postal::codigo:</p>'+
          '<p>Tipo::tipo:</p>'+
          '<p>Precio::precio:</p>'+
          '</div>'+
          '</div>'+
          '</div>'
          if(etipo!="" && eciudad!="")
          {
            for(var i=0;i<a.length;i++)
            {
              var p=parseFloat(a[i].Precio.substring(1,a[i].Precio.length).replace(',',''));
              if(a[i].Tipo==etipo && a[i].Ciudad==eciudad && ( p>preciomenor && p<preciosuperior))
              {
                padre.append(templatecard.replace(':direccion:',a[i].Direccion)
                                         .replace(':ciudad:',a[i].Ciudad)
                                       .replace(':telefono:',a[i].Telefono)
                                     .replace(':codigo:',a[i].Codigo_Postal)
                                   .replace(':tipo:',a[i].Tipo)
                                 .replace(':precio:',a[i].Precio));
              }
            }
          }
          else {
            if (etipo=="" && eciudad=="") {
              alert("precioo")
              for(var i=0;i<a.length;i++)
              {
                var p=parseFloat(a[i].Precio.substring(1,a[i].Precio.length).replace(',',''));
                if(p>preciomenor && p<preciosuperior)
                {
                  padre.append(templatecard.replace(':direccion:',a[i].Direccion)
                                           .replace(':ciudad:',a[i].Ciudad)
                                         .replace(':telefono:',a[i].Telefono)
                                       .replace(':codigo:',a[i].Codigo_Postal)
                                     .replace(':tipo:',a[i].Tipo)
                                   .replace(':precio:',a[i].Precio));
                }
              }
            }
            else {
              if (etipo=="") {
                for(var i=0;i<a.length;i++)
                {
                  var p=parseFloat(a[i].Precio.substring(1,a[i].Precio.length).replace(',',''));
                  if(a[i].Ciudad==eciudad && p>preciomenor && p<preciosuperior)
                  {
                    padre.append(templatecard.replace(':direccion:',a[i].Direccion)
                                             .replace(':ciudad:',a[i].Ciudad)
                                           .replace(':telefono:',a[i].Telefono)
                                         .replace(':codigo:',a[i].Codigo_Postal)
                                       .replace(':tipo:',a[i].Tipo)
                                     .replace(':precio:',a[i].Precio));
                  }
                }
              }
              else {
                for(var i=0;i<a.length;i++)
                {
                  var p=parseFloat(a[i].Precio.substring(1,a[i].Precio.length).replace(',',''));
                  if(a[i].Tipo==etipo && p>preciomenor && p<preciosuperior)
                  {
                    padre.append(templatecard.replace(':direccion:',a[i].Direccion)
                                             .replace(':ciudad:',a[i].Ciudad)
                                           .replace(':telefono:',a[i].Telefono)
                                         .replace(':codigo:',a[i].Codigo_Postal)
                                       .replace(':tipo:',a[i].Tipo)
                                     .replace(':precio:',a[i].Precio));
                  }
                }
              }
            }
          }
        }
      });
    });
    $(document).on("click","#mostrarTodos",function() {

      $.ajax({
              url: "recogerdatos.php",
              type:'GET',
              success:function(json){
                $('#cont').empty()
                 var a=$.parseJSON(json);
                 var padre=$('#cont')
                 var templatecard='<div class="card-panel grey lighten-5 z-depth-1">'+
                 '<div class="row valign-wrapper">'+
                 '<div class="col m5">'+
                 '<img src="img/home.jpg" alt="hogar" class="responsive-img">'+
                 '</div>'+
                 '<div class="col m7">'+
                 '<p>Direccion::direccion:</p>'+
                 '<p>Ciudad::ciudad:</p>'+
                 '<p>Telefono::telefono:</p>'+
                 '<p>Codigo Postal::codigo:</p>'+
                 '<p>Tipo::tipo:</p>'+
                 '<p>Precio::precio:</p>'+
                 '</div>'+
                 '</div>'+
                 '</div>'
                 for(var i=0;i<a.length;i++)
                 {
                   padre.append(templatecard.replace(':direccion:',a[i].Direccion)
                                            .replace(':ciudad:',a[i].Ciudad)
                                          .replace(':telefono:',a[i].Telefono)
                                        .replace(':codigo:',a[i].Codigo_Postal)
                                      .replace(':tipo:',a[i].Tipo)
                                    .replace(':precio:',a[i].Precio));
                 }
              }
        });
    });
});
