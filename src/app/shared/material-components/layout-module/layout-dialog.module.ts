import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LayoutDialogModule {

  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(
    [Breakpoints.XSmall]
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {
  }

  /**
   * Open dialog in desktop (center), in mobile (full)
   * @param dialog
   * @param obj
   * @param options
   */
  openCenterFull(dialog: MatDialog, obj: any, options: any) {
    /**
     *
     * Open the dialog
     *
     */

    /**
     *
     * Setup overlay maxWidth and height
     * maxWidth-> 100% to override maxWidth: 80%
     * height-> 100% to avoid any further limitations
     *
     */
    options.maxWidth = '100vw';
    options.height = '100vh';

    const d = dialog.open(obj, options);
    /**
     *
     * Hook
     *
     */
    const smallDialogSubscription = this.isExtraSmall.subscribe(size => {
      if (size.matches) {
        /**
         *
         * Full screen mobile
         *
         */
        d.updateSize('100%', '100%');
      } else {
        /**
         *
         * The dialog has box size.
         *
         */
        d.updateSize('90%', '90%');
      }
    });
    /**
     *
     * Avoid memory leak
     *
     */
    d.afterClosed().subscribe(() => {
      smallDialogSubscription.unsubscribe();
    });
    /**
     *
     * Return the reference.
     *
     */
    return d;
  }

  /**
   * Open dialog in desktop (center), in mobile (bottom)
   * @param dialog
   * @param obj
   * @param options
   */
  openCenterBottom(dialog: MatDialog, obj: any, options: any) {
    /**
     *
     * Open the dialog
     *
     */

    /**
     *
     * Setup overlay maxWidth and height
     * maxWidth-> 100% to override maxWidth: 80%
     * height-> 100% to avoid any further limitations
     *
     */
    options.maxWidth = '100vw'
    options.height = '100vh'

    const d = dialog.open(obj, options);
    /**
     *
     * Hook
     *
     */
    const smallDialogSubscription = this.isExtraSmall.subscribe(size => {
      if (size.matches) {
        /**
         *
         * Resize only width (bottomSheet)
         *
         */
        d.updateSize('100%', 'auto');
        /**
         *
         * Bottom position
         *
         */
        d.updatePosition({
          left: '25%',
          right: '50%',
          bottom: '0px'
        })
      } else {
        /**
         *
         * Default size for dialog
         *
         */
        d.updateSize('auto', 'auto');
        /**
         *
         * Center dialog
         *
         */
        d.updatePosition({
          left: '',
          top: '',
          right: '',
          bottom: ''
        })
      }
    });
    /**
     *
     * Avoid memory leak
     *
     */
    d.afterClosed().subscribe(() => {
      smallDialogSubscription.unsubscribe();
    });
    /**
     *
     * Return the reference.
     *
     */
    return d;
  }

  /**
   * Open dialog in desktop (right), in mobile (full)
   * @param dialog
   * @param obj
   * @param options
   */
  openRightFull(dialog: MatDialog, obj: any, options: any) {
    /**
     *
     * Open the dialog
     *
     */

    /**
     *
     * Setup overlay maxWidth and height
     * maxWidth-> 100% to override maxWidth: 80%
     * height-> 100% to avoid any further limitations
     *
     */
    options.maxWidth = '100vw';
    options.height = '100vh';

    const d = dialog.open(obj, options);
    /**
     *
     * Hook
     *
     */
    const smallDialogSubscription = this.isExtraSmall.subscribe(size => {
      if (size.matches) {
        /**
         *
         * Full screen width and height for dialog
         *
         */
        d.updateSize('100%', '100%');
      } else {
        /**
         *
         * Full height and width adjustable by the content of the box.
         *
         */
        d.updateSize('auto', '100%');
        /**
         *
         * Reset all options but the dialog needs to be in the right position.
         *
         */
        d.updatePosition({
          left: '',
          top: '',
          right: '0px',
          bottom: ''
        })
      }
    });
    /**
     *
     * Avoid memory leak
     *
     */
    d.afterClosed().subscribe(() => {
      smallDialogSubscription.unsubscribe();
    });
    /**
     *
     * Return the reference.
     *
     */
    return d;
  }

  /**
   * Open dialog in desktop (left), in mobile (full)
   * @param dialog
   * @param obj
   * @param options
   */
  openLeftFull(dialog: MatDialog, obj: any, options: any) {
    /**
     *
     * Open the dialog
     *
     */

    /**
     *
     * Setup overlay maxWidth and height
     * maxWidth-> 100% to override maxWidth: 80%
     * height-> 100% to avoid any further limitations
     *
     */
    options.maxWidth = '100vw'
    options.height = '100vh'

    const d = dialog.open(obj, options);
    /**
     *
     * Hook
     *
     */
    const smallDialogSubscription = this.isExtraSmall.subscribe(size => {
      if (size.matches) {
        /**
         *
         * Full width and height mobile
         *
         */
        d.updateSize('100%', '100%');
      } else {
        /**
         *
         * Full height desktop
         * The width depends on the dialog's content
         *
         */
        d.updateSize('auto', '100%');
        /**
         *
         * Dialog to the left
         *
         */
        d.updatePosition({
          left: '0px',
          top: '',
          right: '',
          bottom: ''
        })
      }
    });
    /**
     *
     * Avoid memory leak
     *
     */
    d.afterClosed().subscribe(() => {
      smallDialogSubscription.unsubscribe();
    });
    /**
     *
     * Return the reference.
     *
     */
    return d;
  }


}
