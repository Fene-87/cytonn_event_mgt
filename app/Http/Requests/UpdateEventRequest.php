<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' =>'required|max:155|min:2',
            'venue' =>'required|max:155|min:2',
            'start_date' =>'required',
            'end_date' =>'required',
            'country_id' =>'required',
            'city_id' =>'required',
            'description' =>'required',
            'num_tickets' =>'required',
        ];
    }
}
