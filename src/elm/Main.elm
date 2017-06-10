module Main exposing (..)

import Html exposing (Html, button, div, form, input, span, text)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)


main : Program Never Model Msg
main =
    Html.beginnerProgram
        { model = initModel
        , view = view
        , update = update
        }


type alias FormModel =
    { name : String
    , password : String
    , passwordAgain : String
    }


type alias Model =
    { count : Int
    , message : String
    , formModel : FormModel
    }


initModel : Model
initModel =
    { count = 0
    , message = ""
    , formModel =
        { name = ""
        , password = ""
        , passwordAgain = ""
        }
    }


type Msg
    = Increment
    | Decrement
    | Change String
    | FormName String
    | FormPassword String
    | FormPasswordAgain String


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (toString model.count) ]
        , button [ onClick Increment ] [ text "+" ]
        , div []
            [ input [ placeholder "Text to reverse", onInput Change ] []
            , span [] [ text (String.reverse model.message) ]
            ]
        , div []
            [ Html.form []
                [ input [ type_ "text", placeholder "Name", onInput FormName ] []
                , input [ type_ "password", placeholder "Password", onInput FormPassword ] []
                , input [ type_ "password", placeholder "Re-enter password", onInput FormPasswordAgain ] []
                ]
            ]
        , viewValidation model
        ]


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            { model | count = model.count + 1 }

        Decrement ->
            { model | count = model.count - 1 }

        Change text ->
            { model | message = text }

        FormName text ->
            let
                oldForm =
                    model.formModel

                newForm =
                    { oldForm | name = text }
            in
                { model | formModel = newForm }

        FormPassword text ->
            let
                oldForm =
                    model.formModel

                newForm =
                    { oldForm | password = text }
            in
                { model | formModel = newForm }

        FormPasswordAgain text ->
            let
                oldForm =
                    model.formModel

                newForm =
                    { oldForm | passwordAgain = text }
            in
                { model | formModel = newForm }


viewValidation : Model -> Html msg
viewValidation model =
    let
        ( color, message ) =
            if model.formModel.password == model.formModel.passwordAgain then
                ( "green", "OK" )
            else
                ( "red", "Passwords do not match!" )
    in
        div [ style [ ( "color", color ) ] ] [ text message ]
