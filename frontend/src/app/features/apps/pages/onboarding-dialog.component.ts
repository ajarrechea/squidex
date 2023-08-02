/*
 * Squidex Headless CMS
 *
 * @license
 * Copyright (c) Squidex UG (haftungsbeschränkt). All rights reserved.
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { fadeAnimation, slideAnimation } from '@app/framework';
import { UsersService } from '@app/shared';

@Component({
    selector: 'sqx-onboarding-dialog',
    styleUrls: ['./onboarding-dialog.component.scss'],
    templateUrl: './onboarding-dialog.component.html',
    animations: [
        fadeAnimation, slideAnimation,
    ],
})
export class OnboardingDialogComponent {

    @Output()
    public close = new EventEmitter();

    public answersForm =
        this.formBuilder.group({
            companySize: '',
            companyRole: '',
            project: '',
        });

    public step = 0;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly usersService: UsersService,
    ) {
    }

    public submitAnswers() {
        this.usersService.postUser({ answers: this.answersForm.value as any }).subscribe();
        this.next();
    }

    public next() {
        this.step += 1;
    }
}
