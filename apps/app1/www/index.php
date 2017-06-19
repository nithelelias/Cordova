<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,300,400,600,700,800' rel='stylesheet' type='text/css'/>
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/bootstrap.css"/>
      <!--link type="text/css" rel="stylesheet" href="datetime/bootstrap.min.css"-->
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/materialadmin.css" />
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/font-awesome.min.css" />
      <!--Font Awesome Icon Font-->
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/material-design-iconic-font.min.css" />
      <!--Material Design Iconic Font-->
      <!-- Additional CSS includes -->
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/material-design-iconic-font.min.css" />
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/libs/DataTables/jquery.dataTables.css"/>
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/libs/DataTables/extensions/dataTables.tableTools.css"/>
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/libs/DataTables/extensions/dataTables.colVis.css"/>
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/libs/toastr/toastr.css"/>
      <link type="text/css" rel="stylesheet" href='../assets/css/theme-default/libs/fullcalendar/fullcalendar.css' />
      <link type="text/css" rel="stylesheet" href="../assets/css/theme-default/libs/bootstrap-datepicker/datepicker3.css" /> 
      <link type="text/css" rel="stylesheet" href="../assets/css/animate.css" />
      <style type="text/css">
        .style-dark{
          background: #2b323a;
          color:white;
        }
        .text-dark{
          color:#2b323a;
        }
         .animation-hidden-ball {
           -webkit-transition:all 1s;
           transition:all 1s;
         }
         .hidden-ball{
            width: 60px !important;
            height: 60px !important;
            border-radius: 60px;
            position: fixed;
            z-index: 1000;
            top: 30%;
            left: 15%;
            background: #2b323a;
         }
          .hidden-ball>div{
             display: none;
         }
         @-moz-keyframes spin_right {
           from { -moz-transform: rotate(0deg); }
           to { -moz-transform: rotate(360deg); }
         }
         @-webkit-keyframes spin_right {
           from { -webkit-transform: rotate(0deg); }
           to { -webkit-transform: rotate(360deg); }
         }
         @keyframes spin_right {
           from {transform:rotate(0deg);}
           to {transform:rotate(360deg);}
         }
         #button-SelectSalaEventInfo-switch-view-wrapper{
           position:absolute;right:0px;top:-11px;z-index:100;
         }
         #count-assist{
           width: 30px;
           height: 30px;
           border-radius: 30px;
           line-height: 30px;
           position: absolute;
           top: 0px;
           right: -20px; 
           -webkit-transition:all 1s;
           transition:all 1s;
         }
         #button-SelectSalaEventInfo-switch-view-wrapper button{
            position: relative;
            -webkit-transition:all 1s;
            transition:all 1s;
         }
         #button-SelectSalaEventInfo-switch-view-wrapper.v2 #count-assist{
           width: 45px;
           height: 45px;
           border-radius: 45px;
           line-height: 45px;
           font-size: 18px;
         }
         #button-SelectSalaEventInfo-switch-view-wrapper.v2 button{
            right: 40px;
         }
         .spin-right{
         -webkit-animation-name: spin_right;
         -webkit-animation-duration: 0.5s;
         -webkit-animation-iteration-count: 1;
         -webkit-animation-timing-function: linear;
         -moz-animation-name: spin_right;
         -moz-animation-duration: 0.5s;
         -moz-animation-iteration-count: 1;
         -moz-animation-timing-function: linear;
         -ms-animation-name: spin_right;
         -ms-animation-duration: 0.5s;
         -ms-animation-iteration-count: 1;
         -ms-animation-timing-function: linear;
         animation-name: spin_right;
         animation-duration: 0.5s;
         animation-iteration-count: 1;
         animation-timing-function: linear;
         }
         .spin-left{
         -webkit-animation-name: spin_left;
         -webkit-animation-duration: 0.5s;
         -webkit-animation-iteration-count: 1;
         -webkit-animation-timing-function: linear;
         -moz-animation-name: spin_left;
         -moz-animation-duration: 0.5s;
         -moz-animation-iteration-count: 1;
         -moz-animation-timing-function: linear;
         -ms-animation-name: spin_left;
         -ms-animation-duration: 0.5s;
         -ms-animation-iteration-count: 1;
         -ms-animation-timing-function: linear;
         animation-name: spin_left;
         animation-duration: 0.5s;
         animation-iteration-count: 1;
         animation-timing-function: linear;
         }
         @-moz-keyframes spin_right {
         from { -moz-transform: rotate(0deg); }
         to { -moz-transform: rotate(360deg); }
         }
         @-webkit-keyframes spin_right {
         from { -webkit-transform: rotate(0deg); }
         to { -webkit-transform: rotate(360deg); }
         }
         @keyframes spin_right {
         from {transform:rotate(0deg);}
         to {transform:rotate(360deg);}
         }
         @-moz-keyframes spin_left {
         from { -moz-transform: rotate(360deg); }
         to { -moz-transform: rotate(0deg); }
         }
         @-webkit-keyframes spin_left {
         from { -webkit-transform: rotate(360deg); }
         to { -webkit-transform: rotate(0deg); }
         }
         @keyframes spin_left {
         from {transform:rotate(360deg);}
         to {transform:rotate(0deg);}
         }
      </style>
   </head>
   <body   >
      <main style='width:95%;margin:0 auto;'>
         <div class="section-body">
            <!--- Calendar -->
            <div class="row">
               <!-- LISTA DE SALAS -->
               <div id="tarjetaCol" class="col-md-3" >
                  <div  id="SalasListWrapper" class="" >
                     <div >
                        <div class="col-md-11">
                           <p class="opacity-75">Indique que salas quiere ver con el check</p>
                        </div>
                        <br>
                        <div class="card">
                           <div class="card-body">
                              <div class="checkbox checkbox-styled">
                                 <label>
                                 <input id="chck_mostrarTodos" type="checkbox" checked="" class=" " data-check="all">
                                 <span>Mostrar Todos</span>
                                 </label>
                              </div>
                              <ul  id="UlsalasList" class="list divider-full-bleed list-events">
                                 <li class="tile  repeat-sala"  data-toggle="title" title="" style="display:none;">
                                    <div class="checkbox checkbox-styled tile-text"   > 
                                       <label>
                                          <input   type="checkbox" checked="" class="checkbox-sala" data-check="0">
                                          <span> <span class="name">&nbsp;</span> <small class="opacity-75  descripcion truncated pull-right" style="margin-left:15px;"  >  </small> </span>
                                       </label> 

                                    </div>
                                    <div class="disabled icon"><i class="fa fa-circle "></i></div>

                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div  id="SelectSalaEventInfo" class="animation-hidden-ball " style="display:none;">
                     <div class="card ">
                        <div class="card-head style-dark">
                           <div class="tools ">  
                              <a class="btn btn-icon-toggle btn-close  "  ><i class="md md-close"></i></a>
                           </div>
                           <header style="width: 80%;    padding: 11px 0px 0px 20px;">
                              <div only-owner >
                                 <small id="SelectSalaEventInfo-title-pencil" class="pull-left" style="margin-right:6px;" data-toggle="tooltip" title="click para editar" ><i class="fa fa-pencil"></i></small>
                                 <h3 contenteditable="true" id="SelectSalaEventInfo-edit-title" class="SelectSalaEventInfo-title no-margin"  ></h3>
                              </div>
                              <div  not-owner>
                                 <h3  class="SelectSalaEventInfo-title no-margin" ></h3>
                              </div>
                           </header>
                        </div>
                        <!-- card head-->
                        <!-- CARD INTERMEDIO -->
                        <div class="style-dark" style="padding:10px 25px;width:100%;">
                           <!--- USUARIO QUE PIDIO -->
                           <div class="row" id="SelectSalaEventInfo-solicitado">
                              <div class="col-md-12" style="">
                                 <div class=" width-2  pull-left tile-icon" style="height:100px;">
                                    <img class="img-circle size-2" src="../images/profile.png" alt=""> 
                                 </div>
                                 <div class="col-md-8">
                                    <div class="tile-name text-bold" style="margin-top:12px;">...</div>
                                    <span class="opacity-50 tile-area text-sm">
                                    AREA
                                    </span> 
                                 </div>
                              </div>
                           </div>
                           <br>
                           <!-- FECHA Y HORA DEL EVENTO -->
                           <div class="row">
                              <div class="row" >
                                 <div class="col-md-6"><b>Hora de inicio </b></div>
                                 <div id="SelectSalaEventInfo-HINI" class="col-md-6 text-medium  text-right"></div>
                              </div>
                              <div  class="row">
                                 <div class="col-md-6"><b>Hora Fin</b> </div>
                                 <div id="SelectSalaEventInfo-HFIN" class="col-md-6 text-medium  text-right"></div>
                              </div>
                           </div>
                           <br>
                           <div only-caduced class="row text-left opacity-75">El evento ya caduco</div>
                           <!-- BOTON PARA CAMBIAR DE BASIC INFO A ASISTNETES -->
                           <div style="position:relative">
                              <div id="button-SelectSalaEventInfo-switch-view-wrapper" >
                                 <button type="button" class="btn   btn-floating-action btn-primary" id="button-SelectSalaEventInfo-switch-view"
                                    data-swith="1" data-toggle="tooltip" title="Asistentes">
                                    <div>  <i class="fa fa-users"></i></div>
                                 </button>
                                 <div id="count-assist" class=" style-danger  text-white text-bold text-center btn-floating-action " data-toggle="tooltip" title="Cantidad de asistentes">                                      
                                 </div>
                              </div>
                           </div>
                        </div>
                        <!-- CARD BODY-->
                        <div class="card-body" style="padding:16px;">
                           <!-- BASIC INFO -->
                           <div id="SelectSalaEventInfo-view-basic">
                            <br>
                              <!-- SELECCION DE SALA  / INFORMACION SALA-->
                              <div class="row">
                                 <div class="col-md-12">
                                    <div only-owner  not-caduced>
                                       <div class="input-group form-group no-margin">
                                          <label class=" control-label   ">Salas</label>
                                          <select id="SelectSalaEventInfo-select-sala" class="form-control">
                                          </select>
                                          <span class="input-group-addon tile-icon"><i class='fa fa-circle fa-2x' style="margin-top:20px;"></i></span>
                                       </div>
                                       <p class="opacity-75 small">Solo apareceran las salas disponibles en este rango de horas</p>
                                    </div>
                                    <!--- MOSTRAR LA SALA APARTADA DE ESTE EVENTO -->
                                    <div not-owner only-caduced>
                                       <!-- INFO DE LA SALA --> 
                                       <div  class="opacity-75">Sala Reservada</div>
                                       <h3 class="no-margin col-md-11">
                                          <span id="SelectSalaEventInfo-sala-info">
                                          </span>
                                          <span id="SelectSalaEventInfo-sala-info-icon" class=" pull-right" style="opacity: 0.7;"><i class="fa fa-circle "></i></span>
                                       </h3>
                                    </div>
                                 </div>
                              </div>
                              <br>
                              <!-- INDIQUE EL CENTRO DE COSTO DE LA REUNION SI TIENE -->
                              <div class="row">
                                 <div class="col-md-12">
                                    <div class="  form-group" only-owner  not-caduced>
                                       <label for="SelectSalaEventInfo-select-cc" class=" control-label">Centro de Costo</label>
                                       <select id="SelectSalaEventInfo-select-cc" class="form-control">

                                       </select>
                                       
                                    </div>
                                    <!-- INFO DEL CENTRO DE COSTO SI EL EVENTO HA CADUCADO -->
                                    <div class="" not-owner  only-caduced id="SelectSalaEventInfo-cc-info">
                                       <div  class="opacity-75">Centro de Costo</div>
                                       <div class="col-md-11"><span class="text-bold text-dark"> </span></div>
                                    </div>
                                 </div>
                              </div>
                              <br>
                              <!-- INDIQUE COMENTARIO DE LA REUNION -->
                              <div class="row" >
                                 <div class="form-group col-md-12" only-owner not-caduced>
                                    <label for="SelectSalaEventInfo-comentario" class=" control-label">Comentario</label>
                                    <div class="">
                                       <textarea   id="SelectSalaEventInfo-comentario" class="form-control" rows="3" placeholder="Escriba su comentario o informacion del evento"></textarea>
                                       <div class="form-control-line"></div>
                                    </div>
                                 </div>
                                 <!-- SI EL EVENTO YA CADUCO SOLO MUESTRE EL COMENTARIO/ O SI NO ERES EL AUTOR -->
                                 <div class="col-md-12" not-owner only-caduced id="SelectSalaEventInfo-comentario-info">
                                    <div  class="opacity-75">Comentario</div>
                                    <div class="col-md-11"> <em class="text-dark" ></em></div>
                                 </div>
                              </div>
                           </div>
                           <!-- ASISTENTES DEL EVENTO -->
                           <div id="SelectSalaEventInfo-view-assistents" style="display:none">
                              <div class="row">
                                 <div class="col-md-12">
                                    <h3> Asistentes</h3>
                                    <div class="no-list-asstent" class=" " style="display:none;">
                                       <p class="opacity-75">No hay Ningun asistente a esta reunion</p>
                                    </div>
                                    <ul class="list divider-full-bleed assistent-list">
                                       <li class="tile repeat-assistent" style="display:none" >
                                          <a class="tile-content ink-reaction" href="#">
                                          <img class="img-circle img-responsive pull-left width-1 tile-image" src="../images/profile.png" alt="">
                                          <span class="text-medium tile-name">xxx xxx</span><br>
                                          <span class="opacity-50 tile-area text-sm">
                                          AREA
                                          </span> 
                                          </a>
                                          <a class="btn btn-flat ink-reaction btn-remove">
                                          <i class="fa fa-trash"></i>
                                          </a>
                                       </li>
                                    </ul>
                                    <div id='addAsistent-link' only-owner not-caduced class="tile" style="text-align:right;">
                                       <a class="btn-link ink-reaction" href="#">
                                       Agregar asistente 
                                       </a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <!-- card-body-->
                        <div class="modal-footer" only-owner not-caduced>
                           <button type="button" class="btn btn-danger btn-raised btn-loading-state btn-sm" id="btnEliminarEvento" style="display:none;" >
                           Eliminar
                           </button>
                           <button type="button" class="btn btn-default btn-sm " id="btnCancelar" >Cancelar</button>
                           <button type="button" class="btn btn-success btn-raised btn-loading-state btn-sm" id="btnGuardarEvento" >Guardar</button>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- BEGIN CALENDAR -->
               <div id="calendarCol" class="col-md-9">
                  <div class="card">
                     <div class="card-head style-primary">
                        <header>
                           <span class="selected-day"> </span> &nbsp;  <small class="selected-date"> </small>
                        </header>
                        <div class="tools">
                           <div class="btn-group">

                              <a id="calender-month" data-toggle="tooltip"  title='Seleccionar Mes' class="btn btn-flat ink-reaction" style="margin-top:4px;"><i class="fa fa-calendar"></i></a>
                              <a id="calender-today" class="btn btn-flat ink-reaction">Hoy</a>                           
                              <a id="calender-prev" class="btn btn-icon-toggle ink-reaction"><i class="fa fa-angle-left"></i></a>                         
                              <a id="calender-next" class="btn btn-icon-toggle ink-reaction"><i class="fa fa-angle-right"></i></a>
                           </div>
                        </div>
                     </div>
                     <!--end .card-head -->
                     <div class="card-body no-padding">
                        <div id="calendar"></div>
                     </div>
                     <!--end .card-body -->
                  </div>
                  <!--end .card -->
               </div>
               <!--end .col -->
            </div>
         </div>
         <!--MODAL-->
         <div class="modal fade in" id="modelAssitents" tabindex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
            <div class="modal-dialog">
               <div class="modal-content card">
                  <div class="modal-header card-head style-primary">
                     <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                     <h4 class="modal-title" > Seleccionar Asistentes</h4>
                  </div>
                  <div class="modal-body">
                     <div class="row">
                        <div class="col-md-6">
                           <div class="input-group">
                              <input type="search" id="filter-empleado-list" class="form-control" placeholder="Filtrar"  data-toggle="tooltip" title="Filtrar">
                              <span class="input-group-addon tile-icon"><i class='fa fa-filter' ></i></span>
                           </div>
                        </div>
                        <div class="col-md-6">
                           <div class="form-group">
                              <select id="select-filter-empleado-list-area"
                                 class="form-control"
                                 placeholder="Seleccionar por Area" data-toggle="tooltip" title="seleccionar por area">
                                 <option value="ALL">Todas Areas</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <ul id="empleado-list" class="nav nav-pills nav-stacked">
                        <li class=" repeat-li " style="display:none;">
                           <a class="tile-content ink-reaction btn btn-flat" style="text-align:left;">
                              <div class="stick-top-right small-padding sticker selected-empleado" >
                                 <i class="fa fa-check-circle  fa-fw text-success" data-toggle="tooltip" data-placement="left" 
                                    data-original-title="Seleccionado"></i>
                              </div>
                              <img class="img-circle img-responsive pull-left width-1 tile-image" src="../images/profile.png" alt="">
                              <span class="text-medium tile-name">xxx xxx</span><br>
                              <span class="opacity-50 tile-area">
                              AREA
                              </span> 
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
               <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
         </div>
         <!-- /.modal -->
         </div>
         <br><br>
      </main>
      <br><br>
      <!-- BEGIN JAVASCRIPT --> 
      <!--script src="../assets/js/libs/jquery/jquery-1.11.2.min.js"></script--> 
      <script src="../assets/js/libs/jquery/jquery-3.2.0.min.js"></script> 
      <script src="../assets/js/libs/jquery-ui/jquery-ui.min.js"></script> 
      <script src="../assets/js/libs/bootstrap/bootstrap.min.js"></script>
      <script src="../assets/js/libs/nanoscroller/jquery.nanoscroller.min.js"></script>
      <script src="../assets/js/libs/bootstrap-datepicker/bootstrap-datepicker.js"></script>
      <!-- Put App.js last in your javascript imports -->
      <script src="../assets/js/libs/toastr/toastr.js"></script>
      <!-- NOVEDADES --> 
      <script language="javascript" type="text/javascript" src="../assets/js/libs/moment/moment.min.js"> </script>  
      <script language="javascript" type="text/javascript" src="../assets/js/libs/fullcalendar/fullcalendar.min.js"> </script>
      <script language="javascript" type="text/javascript" src="../assets/js/libs/fullcalendar/lang-all.js"></script>
 
      <script src="salasApp.js?v1.7.3"></script>
      <script src="Empleado.js?v1.2"></script>
      <script src="../assets/js/core/source/App.min.js"></script>
   </body>
</html>