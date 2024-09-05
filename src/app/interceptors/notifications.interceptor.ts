import { HttpInterceptorFn } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';

export const notificationsInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = ''
  const routesToNotify: {
    url: string
    method: string
    errorMessage: string
    successMessage: string
    //routeToNavigate: string
  }[] = [
    /* ACA ESPECIFICAR LAS RUTAS CON EL METODO EL CUAL NECESITA SER NOTIFICADO EL EXITO O ERROR */
    {
      url: '/api/reservas',
      method: 'POST',
      errorMessage: 'Error al crear la reserva, por favor revise los datos y vuelva a intentarlo',
      successMessage: 'La reserva se ha creado con exito'
    }
  ]

  const shouldNotify = routesToNotify.find(route => req.url.includes(apiUrl + route.url) && req.method === route.method)

  return next(req).pipe(
    tap({
      complete: () => {
        if (shouldNotify) {
          /*
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success ',
              cancelButton: 'btn btn-danger'
            }
          })
          swalWithBootstrapButtons
            .fire({
              title: '¡Creado con éxito!',
              text: shouldNotify.successMessage,
              icon: 'success'
            })
            .then(() => {
              if (shouldNotify.routeToNavigate.length > 0) {
                router.navigate([shouldNotify.routeToNavigate])
              }
            })*/
        }
      }
    }),
    catchError((err: any) => {
      if (shouldNotify) {/*
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success ',
            cancelButton: 'btn btn-danger'
          }
        })
        swalWithBootstrapButtons.fire({
          title: 'Ha ocurrido un error',
          text: shouldNotify.errorMessage,
          icon: 'error'
        })*/
      }
      return throwError(() => err)
    })
  )
};
